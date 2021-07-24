import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { supabase } from "supabase/supabase";

import {
  Button,
  Container,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import useStyles from "styles";

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
    let { data } = await supabase.from("RegisteredUsers").select(`email`);
    setEmails(data.map((x) => x.email));
  };

  let unSelectionAll = async () => {
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

  let cancelMessage = () => {
    setEmails([]);
    setStateMessage(false);
  };

  useEffect(() => {
    getUsers();
    validateRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

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

  console.log(emails);

  return (
    <Container style={{ backgroundColor: '#fff658'}}>
      {admin ? (
        <Grid container>
          <div>
            <form onSubmit={search}>
              <input
                type="text"
                placeholder="Search User by email"
                ref={emailSearching}
              />
              <button type="submit">Search</button>
              <button type="button" onClick={cancelSearch}>
                Reset Search
              </button>
            </form>
          </div>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>User N° </TableCell>
                <TableCell>Email </TableCell>
                <TableCell>Id user </TableCell>
                <TableCell>BLOCK USER </TableCell>
                <TableCell>UPGRADE TO ADMIN </TableCell>
                <TableCell>RESET PASSWORD </TableCell>
                <TableCell>
                  Send message <br />
                  <button onClick={selectionAll}>Select All</button>
                  <br />
                  <button onClick={unSelectionAll}>Unselect All</button>
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
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
          <div></div>
          <div>
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
          </div>
          {statemessage && emails.length !== 0 ? (
            <div>
              <h1> Message </h1>
              <input type="text" ref={title} placeholder="Add Title" />
              <textarea
                ref={message}
                cols="30"
                rows="10"
                required
              ></textarea>{" "}
              <button type="button" onClick={cancelMessage}>
                {"Cancel Message "}
              </button>
              <button type="button" onClick={sendEmail}>
                Send Mails
              </button>
            </div>
          ) : null}
        </Grid>
      ) : null}
    </Container>
  );
};
