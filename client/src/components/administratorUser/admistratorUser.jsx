import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { supabase } from "supabase/supabase";
import useStyles from "styles";
import Swal from "sweetalert2";

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
  TextareaAutosize,
  Modal,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { GET_USER_DETAILS_ID } from "redux/actions/actions";
import { CardUser } from "components/cardUser/cardUser";

export const AdministratorUser = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const session = supabase.auth.session();
  const { user } = session;
  let id = user.id;

  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(0);
  const [emails, setEmails] = useState([]);
  const [commision, setCommision] = useState(false);
  const [statusComision, setStatusComision] = useState({
    porcentaje: "",
    fecha: "",
  });
  const [selectAll, setSelectAll] = useState(true);
  const [render, setRender] = useState([]);
  const [detailModal, setDetailModal] = useState(false);
  const [detailModalId, setDetailModalId] = useState(null);
  const handleModal = (id) => {
    setDetailModal(true);
    setDetailModalId(id);
    dispatch(GET_USER_DETAILS_ID(id));
  };
  const handleModalClose = () => {
    setDetailModal(false);
  };

  const confirmation = useRef("");
  const emailSearching = useRef("");
  const newComision = useRef("");
  let title = useRef("");
  let message = useRef("");

  let addEmail = (email) => {
    setEmails([...emails, email]);
  };

  let deleteEmail = (email) => {
    setEmails(emails.filter((x) => x !== email));
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
    Swal.fire({
      title: "Email sent!",
      text: `to ${emailUser}`,
      icon: "success",
      confirmButtonText: "Cool",
      background: "#1f1f1f",
      confirmButtonColor: "rgb(158, 158, 158)",
    });

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

  let sendEmail = async () => {
    message = message.current.value;
    title = title.current.value;

    let data = { receivers: [...emails], message, title };

    if (emails.length > 0 && message !== "" && title !== "") {
      Swal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "Cool",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
      setEmails([]);
      handleClose();
      await axios({
        url: "/emails",
        method: "Post",
        data,
      })
        .then((a) => console.log(a))
        .catch((err) => console.log(err));

      return history.push("/home");
    }
    Swal.fire({
      title: "Ehem!",
      text: "Please add one email or add one message",
      icon: "warning",
      confirmButtonText: "Sure",
      background: "#1f1f1f",
      confirmButtonColor: "rgb(158, 158, 158)",
    });
  };

  let cancelMessage = () => {
    setEmails([]);
    handleClose();
  };

  let search = (event) => {
    event.preventDefault();

    let name = emailSearching.current.value;
    
    let info = [...users];
    let filterSearch = info.filter((e) => {
      let { email } = e;
      let data = email.includes(name.toLowerCase());
      return data;
    });

    setRender(filterSearch);
  };

  let cancelSearch = () => {
    setRender(users);
    emailSearching.current.value = "";
    return history.push("/home");
  };

  let comisionChange = async (event) => {
    event.preventDefault();
    if (confirmation.current.value === "CONFIRM") {
      await supabase
        .from("commsion_server")
        .insert([{ id_user: id, percentage: newComision.current.value }]);
      setCommision(!commision);

      actualcomision();

      return Swal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "Cool",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }
    Swal.fire({
      title: "Ehem!",
      text: 'Complet or Write "CONFIRM" correctly',
      icon: "warning",
      confirmButtonText: "Sorry",
      background: "#1f1f1f",
      confirmButtonColor: "rgb(158, 158, 158)",
    });
  };

  let actualcomision = async () => {
    let { data: commsion_server, error } = await supabase
      .from("commsion_server")
      .select("*");

    let ultimo = commsion_server.pop();
    let { percentage, date } = ultimo;

    if (error)
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
        confirmButtonText: "Ups",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
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

  //modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Grid container>
      <Grid item xs={10} align="center" className={classes.modal}>
        <Typography
          variant="h5"
          className={classes.text}
          style={{ marginBottom: 20 }}
        >
          {"Message "}
        </Typography>
        <TextField
          type="text"
          inputRef={title}
          placeholder="Add Title"
          style={{ marginBottom: 20 }}
        />
        <TextareaAutosize
          ref={message}
          placeholder="Write message..."
          minRows={5}
          fullWidth={true}
          style={{ marginBottom: 20 }}
          required
        ></TextareaAutosize>
        <ButtonGroup style={{ marginBottom: 20 }}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => sendEmail()}
          >
            Send Mails
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => cancelMessage()}
          >
            {"Cancel Message "}
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );

  return (
    <Container
      disableGutters
      className={classes.adminContainer}
    >
      <Card elevation={3} className={classes.adminCard}>
        {admin ? (
          <Grid container>
            <Grid container item md={6} style={{marginBottom:'1%'}}>
              {!commision ? (
                <Grid container style={{ marginLeft:'2%'}}>
                  <Grid item xs={5} md={6}>
                    <Button
                      onClick={() => setCommision(!commision)}
                      variant="contained"
                      style={{marginTop:'2%'}}
                    >
                      {"Change commision"}
                    </Button>
                  </Grid>
                  <Grid item xs={7} md={6}>
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      style={{marginTop:'-2%'}}
                    >
                      Current Commission: {statusComision.porcentaje} %
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      style={{margin:'0%'}}

                    >
                      Date: {new Date(statusComision.fecha).getDate()}/
                      {new Date(statusComision.fecha).getMonth() + 1}/
                      {new Date(statusComision.fecha).getUTCFullYear()}{" "}
                      {new Date(statusComision.fecha).getUTCHours()}:
                      {new Date(statusComision.fecha).getUTCMinutes()}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <>
                  <form onSubmit={comisionChange}>
                    <Grid container style={{marginLeft:'2%', marginTop:'2%'}} >
                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          placeholder="New value"
                          inputRef={newComision}
                          color="secondary"
                          variant="outlined"
                          required
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          placeholder="Write CONFIRM"
                          inputRef={confirmation}
                          color="secondary"
                          variant="outlined"
                          size="small"
                          required
                        />
                      </Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={4} >
                        <ButtonGroup style={{height: '100%'}}>
                          <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                          >
                            {"Send "}
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setCommision(!commision)}
                          >
                            {"back "}
                          </Button>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                  </form>
                </>
              )}
            </Grid>
            <Grid item md={4}>
              <form onSubmit={search} className={classes.adminCardSearch}>
                <FormControl style={{ marginTop:'2%',paddingRight: "3%", height: "100%" }}>
                  <TextField
                    type="text"
                    placeholder="Search User by email"
                    inputRef={emailSearching}
                  />
                </FormControl>
                <FormControl style={{ marginTop:'2%'}}>
                  <ButtonGroup >
                    <Button type="submit" variant="contained" color="secondary">
                      Search
                    </Button>
                    <Button
                      type="button"
                      variant="outlined"
                      color="secondary"
                      onClick={() => cancelSearch()}
                    >
                      Reset 
                    </Button>
                  </ButtonGroup>
                </FormControl>
              </form>
            </Grid>
            {/* <Grid item xs={1}></Grid> */}
            {emails.length > 0 ? (
              <Grid item xs={12} md={2}>
                <Button
                  type="button"
                  onClick={() => handleOpen()}
                  color="secondary"
                  variant="outlined"
                  style={{marginLeft:'5%', marginTop:'4%', marginBottom:'1%'}}
                >
                  {" Add Message "}
                </Button>
                <Modal
                  open={open}
                  // onClose={() => handleClose()}
                >
                  {body}
                </Modal>
              </Grid>
            ) : null}

            <Grid item xs={12}>
              <TableContainer className={classes.adminTableContainer}>
                <Table
                  padding="checkbox"
                  size="small"
                  component={Paper}
                  className={classes.adminTable}
                  stickyHeader={true}
                >
                  <TableHead style={{ height: "15vh" }}>
                    <TableRow>
                      <TableCell
                        style={{ color: "#000", backgroundColor: "#949494" }}
                      >
                        #
                      </TableCell>
                      <TableCell
                        style={{ color: "#000", backgroundColor: "#949494" }}
                      >
                        EMAIL
                      </TableCell>
                      <TableCell
                        style={{ color: "#000", backgroundColor: "#949494" }}
                      >
                        ID USER
                      </TableCell>
                      <TableCell
                        style={{ color: "#000", backgroundColor: "#949494" }}
                      >
                        BLOCK USER
                      </TableCell>
                      <TableCell
                        style={{ color: "#000", backgroundColor: "#949494" }}
                      >
                        ROLE
                      </TableCell>
                      <TableCell
                        style={{ color: "#000", backgroundColor: "#949494" }}
                      >
                        RESET PASSWORD
                      </TableCell>
                      <TableCell
                        style={{ color: "#000", backgroundColor: "#949494" }}
                      >
                        SEND EMAIL <br />
                        {selectAll ? (
                          <Button
                            size="medium"
                            variant="contained"
                            color="secondary"
                            onClick={() => selectionAll()}

                          >
                            SELECT ALL
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={unSelectionAll}
                          >
                            UNSELECT
                          </Button>
                        )}
                      </TableCell>
                      <TableCell
                        style={{ color: "#000", backgroundColor: "#949494" }}
                      >
                        DETAILS USER
                      </TableCell>
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
                                🚫
                              </Button>
                            ) : (
                              <Button onClick={() => bannear(id_user)}>
                                ✅
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            {isAdmin ? (
                              <Button onClick={() => noBeAdmin(id_user)}>
                                🚀
                              </Button>
                            ) : (
                              <Button onClick={() => toBeAdmin(id_user)}>
                                👤
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => resetPassword(email)}>
                              🔑
                            </Button>
                          </TableCell>
                          <TableCell>
                            {!emails.includes(email) ? (
                              <Button onClick={() => addEmail(email)}>✉</Button>
                            ) : (
                              <Button onClick={() => deleteEmail(email)}>
                                📧
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => handleModal(id_user)}>
                              🔎
                            </Button>
                            <Modal
                              open={detailModal && detailModalId === id_user}
                              onClose={handleModalClose}
                              style={{ overflow: "scroll", zIndex: "10000" }}
                            >
                              <CardUser back={handleModalClose} />
                            </Modal>
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
