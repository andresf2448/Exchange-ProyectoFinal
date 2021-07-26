import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { supabase } from "supabase/supabase";
import useStyles from "styles";

import {
  Button,
  Container,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  Card,
  Typography,
  ButtonGroup,
  FormControl,
  Paper,
  TextareaAutosize
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { GET_USER_DETAILS_ID } from "redux/actions/actions";

export const AdministratorUser = () => {
  const classes = useStyles();
  const history = useHistory();
  const session = supabase.auth.session();
  const { user } = session;
  let id = user.id;
  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(0);
  const [emails, setEmails] = useState([]);
  const [statemessage, setStateMessage] = useState(false);
  const emailSearching = useRef("");
  const dispatch = useDispatch();
  const [commision, setCommision] = useState(false);
  const confirmation = useRef("");
  const [statusComision, setStatusComision] = useState({
    porcentaje: "",
    fecha: "",
  });
  const newComision = useRef("");
  const [selectAll, setSelectAll] = useState(true)

  const [render, setRender] = useState([]);
  let title = useRef("");
  let message = useRef("");

  let addEmail = (email) => {
    setEmails([...emails, email]);
  };

  let deleteEmail = (email) => {
    setEmails(emails.filter((x) => x !== email));
    if (emails.length === 0) {
      setStateMessage(false);
    }
  };

  let validateRole = async () => {
    let { data } = await supabase
      .from("RegisteredUsers")
      .select(`*`)
      .eq("id_user", session.user.id);

    let info = data[0].isAdmin;

    if (info) setAdmin(true);

    if (!info) history.push("/home");
  };

  let getUsers = async () => {
    let { data } = await supabase.from("RegisteredUsers").select("*");
    let filter = data.filter((user) => user.id_user !== id);
    let renderUsers = filter.sort((a, b) => (a.email > b.email ? 1 : -1));
    setUsers(renderUsers);
    setRender(renderUsers);
  };

  let bannear = async (id) => {
    let userBan = id;
    await supabase
      .from("RegisteredUsers")
      .update({ bannedUser: "true" })
      .match({ id_user: userBan });
    setReload(reload + 1);
  };

  let desBanear = async (id) => {
    let desban = id;

    await supabase
      .from("RegisteredUsers")
      .update({ bannedUser: "false" })
      .match({ id_user: desban });
    setReload(reload - 1);
  };

  let toBeAdmin = async (id) => {
    let actAdmin = id;

    await supabase
      .from("RegisteredUsers")
      .update({ isAdmin: "true" })
      .match({ id_user: actAdmin });
    setReload(reload - 1);
  };

  let noBeAdmin = async (id) => {
    let desAdmin = id;

    await supabase
      .from("RegisteredUsers")
      .update({ isAdmin: "false" })
      .match({ id_user: desAdmin });
    setReload(reload - 1);
  };

  let resetPassword = async (email) => {
    let emailUser = email;
    alert(` Email sent to ${emailUser}`);

    await supabase
      .from("RegisteredUsers")
      .update({ resetPassword: "true" })
      .match({ email: emailUser });

    await supabase.auth.api.resetPasswordForEmail(emailUser);
  };

  let selectionAll = async () => {
    setSelectAll(false);
    let { data } = await supabase.from("RegisteredUsers").select(`email`);
    setEmails(data.map((x) => x.email));
  };

  let unSelectionAll = async () => {
    setSelectAll(true);
    setEmails([]);
  };

  let addMessage = () => {
    setStateMessage(!statemessage);
  };

  let sendEmail = async () => {
    message = message.current.value;
    title = title.current.value;
    let data = { receivers: [...emails], message, title };

    if (emails.length > 0 && message !== "" && title !== "") {
      alert("Success");
      setStateMessage(false);
      setEmails([]);
      await axios({
        url: "http://localhost:3001/emails",
        method: "Post",
        data,
      })
        .then((a) => console.log(a))
        .catch((err) => console.log(err));

      return history.push("/home");
    }

    alert("Please add one email or add one message");
  };

  // let cancelMessage = () => {
  //   setEmails([]);
  //   setStateMessage(false);
  // };

  let search = (event) => {
    event.preventDefault();

    let info = [...users];
    let filterSearch = info.filter((e) => {
      let { email } = e;
      let data = email.includes(emailSearching.current.value);
      return data;
    });

    setRender(filterSearch);
  };

  let cancelSearch = () => {
    setRender(users);
    emailSearching.current.value = "";
    return history.push("/home");
  };

  let detailsUser = (id) => {
    dispatch(GET_USER_DETAILS_ID(id));
    history.push("/detailsUsers");
  };

  let comisionChange = async (event) => {
    event.preventDefault();
    if (confirmation.current.value === "CONFIRM") {
      await supabase
        .from("commsion_server")
        .insert([{ id_user: id, percentage: newComision.current.value }]);
      setCommision(!commision);
      return alert("Sucess");
    }
    alert('Complet or Write "CONFIRM" correctly');
  };

  let actualcomision = async () => {
    let { data: commsion_server, error } = await supabase
      .from("commsion_server")
      .select("*");

    let ultimo = commsion_server.pop();
    let { percentage, date } = ultimo;

    if (error) alert(error);
    setStatusComision({
      porcentaje: percentage,
      fecha: date,
    });
  };

  useEffect(() => {
    getUsers();
    validateRole();
    actualcomision();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <Container disableGutters maxWidth={false} className={classes.adminContainer}>
      <Card elevation={3} className={classes.adminCard}>
      {admin ? (
        <Grid container>
          <Grid container xs={6} direction="column" alignContent="center">
            {/* <Grid item xs={12}> */}
            {/* </Grid> */}

            <Button onClick={() => setCommision(!commision)} variant="contained">
              {"Change the commision server"}
            </Button>
            {commision ? (
              <Grid item xs={5} direction="column" >
                <form onSubmit={comisionChange}>
                  <TextField
                    type="text"
                    placeholder="New value"
                    ref={newComision}
                    color="secondary"
                    variant="outlined"
                    size="small"
                    required
                  />

                  <TextField
                    type="text"
                    placeholder="Write CONFIRM"
                    ref={confirmation}
                    color="secondary"
                    variant="outlined"
                    size="small"
                    required
                  />
                  <Button variant="contained" color="secondary" type="submit"> Send</Button>
                </form>
              </Grid>
            ) : (
              <Grid item xs={6}>
                <Typography variant="body1" color="secondary" gutterBottom align="left">Comision actual: {statusComision.porcentaje} %</Typography>
                <Typography variant="body1" color="secondary" gutterBottom align="left">Fecha: {statusComision.fecha}</Typography>
              </Grid>
            )}
            
          </Grid>
          <Grid item xs={6} direction="column">
            <form onSubmit={search} className={classes.adminCardSearch}>
            <FormControl margin="normal">
              <TextField
                type="text"
                placeholder="Search User by email"
                ref={emailSearching}
              />
              <ButtonGroup>
                <Button type="submit" variant="contained" color="secondary">Search</Button>
                <Button type="button" variant="outlined" color="secondary" onClick={cancelSearch}>
                  Reset Search
                </Button>
              </ButtonGroup>
            </FormControl>
            </form>
          </Grid>
          {/* <Grid container xs={4} justifyContent="center" alignContent="center">
            <Grid item xs={12} justifyContent="center">
              {emails.length > 0 ? (
                <Button
                  type="button"
                  onClick={addMessage}
                  color="primary"
                  variant="contained"
                  className={classes.buttonBack}
                >
                  {" Add Message "}
                </Button>
              ) : null}
            </Grid>
            {statemessage && emails.length !== 0 ? (
              <Grid item xs={10} direction="column">
                <Typography variant="h5"> Message </Typography>
                <TextField type="text" ref={title} placeholder="Add Title" />
                <TextareaAutosize
                  ref={message}
                  placeholder="Write message..."
                  minRows={5}
                  fullWidth={true}
                  required
                ></TextareaAutosize>{" "}
                <ButtonGroup>
                  <Button type="button" variant="contained" color="secondary" onClick={sendEmail}>
                    Send Mails
                  </Button>
                  <Button type="button" variant="outlined" color="secondary" onClick={cancelMessage}>
                    {"Cancel Message "}
                  </Button>
                </ButtonGroup>
              </Grid>
            ) : null}
          </Grid> */}
          <Grid item xs={12}>
            <TableContainer className={classes.adminTableContainer}>
              <Table padding="checkbox" size="small" component={Paper} className={classes.adminTable}>
                <TableHead >
                  <TableRow>
                    <TableCell variant="head">Number</TableCell>
                    <TableCell variant="head">Email</TableCell>
                    <TableCell variant="head">Id user</TableCell>
                    <TableCell variant="head">Block user</TableCell>
                    <TableCell variant="head">Upgrade to admin</TableCell>
                    <TableCell variant="head">Reset password</TableCell>
                    <TableCell variant="head">
                      Send Email <br />
                      {selectAll ?
                        <Button size="small" variant="contained" color="secondary" onClick={selectionAll}>Select All</Button>
                        :
                        <Button size="small" variant="outlined" color="secondary" onClick={unSelectionAll}>Unselect All</Button>
                      }
                    </TableCell>
                    <TableCell variant="head">Details Users</TableCell>
                  </TableRow>
                </TableHead>
                {render.map((user, i) => {
                  const { email, bannedUser, id_user, isAdmin } = user;
                  return (
                    <TableBody key={i} className={classes.tableBody}>
                      <TableRow>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{id_user}</TableCell>
                        <TableCell>
                          {bannedUser ? (
                            <Button onClick={() => desBanear(id_user)}>
                              Unblock
                            </Button>
                          ) : (
                            <Button onClick={() => bannear(id_user)}>
                              Blocked
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          {isAdmin ? (
                            <Button onClick={() => noBeAdmin(id_user)}>
                              to user
                            </Button>
                          ) : (
                            <Button onClick={() => toBeAdmin(id_user)}>
                              Up to Admin
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => resetPassword(email)}>
                            Reset
                          </Button>
                        </TableCell>
                        <TableCell>
                          {!emails.includes(email) ? (
                            <Button onClick={() => addEmail(email)}>
                              Selected
                            </Button>
                          ) : (
                            <Button onClick={() => deleteEmail(email)}>
                              UnSelected
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => detailsUser(id_user)}>
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        ) : null}
      </Card>
    </Container>
  );
};