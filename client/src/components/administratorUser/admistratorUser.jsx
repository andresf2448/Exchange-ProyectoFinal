import { useState, useEffect } from "react";
import { useHistory } from "react-router";
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
import { useRef } from "react";
import axios from "axios";

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
  const [searchUser, setSearchUser] = useState(false);
  const emailSearching = useRef("");
  const [renderSearch, setrenderSearch] = useState([]);

  let message = useRef("");

  let addEmail = (email) => {
    setEmails([...emails, email]);
  };
  let deleteEmail = (email) => {
    setEmails(emails.filter((x) => x !== email));
  };

  async function validateRole() {
    let { data } = await supabase
      .from("RegisteredUsers")
      .select(`*`)
      .eq("id_user", session.user.id);

    let info = data[0].isAdmin;

    if (info) setAdmin(true);

    if (!info) history.push("/home");
  }

  let getUsers = async () => {
    let { data } = await supabase.from("RegisteredUsers").select("*");
    let filter = data.filter((user) => user.id_user !== id);
    let renderUsers = filter.sort((a, b) => (a.email > b.email ? 1 : -1));
    setUsers(renderUsers);
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
    setStateMessage(true);
  };

  let sendEmail = async () => {
    message = message.current.value;
    let data = { receivers: [...emails], message };

    if (emails.length > 0 && message !== "") {
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

  let filter = users.filter((user) => user.id_user !== id);
  let renderUsers = filter.sort((a, b) => (a.email > b.email ? 1 : -1));

  let search = () => {
    setSearchUser(true);

    let filterSearch = renderUsers.filter((e) => {
      let { email } = e;
      let data = email.includes(emailSearching.current.value);
      return data;
    });

    setrenderSearch(filterSearch);
  };

  let cancelSearch = () => {
    setSearchUser(false);

    return history.push("/home");
  };
  return (
    <Container>
      <div>
        <input
          type="text"
          placeholder="Search user by email"
          ref={emailSearching}
        />
        <button type="button" onClick={search}>
          Search
        </button>
      </div>

      <div>
        <button onClick={cancelSearch} type="button">
          All users
        </button>
      </div>
      {searchUser ? (
        <div>
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
                  Send Email <br />
                  <button onClick={selectionAll}>Select All</button>
                  <br />
                  <button onClick={unSelectionAll}>Unselect All</button>
                </TableCell>
              </TableRow>
            </TableHead>
            {renderSearch.map((user, i) => {
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
                        <Button onClick={() => addEmail(email)}>Select</Button>
                      ) : (
                        <Button onClick={() => deleteEmail(email)}>
                          UnSelect
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>

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
            {!statemessage ? null : (
              <div>
                <h1> Message </h1>
                <textarea
                  ref={message}
                  cols="30"
                  rows="10"
                  required
                ></textarea>{" "}
                <button type="button" onClick={cancelMessage}>
                  {" "}
                  Cancel Message
                </button>
                <button type="button" onClick={sendEmail}>
                  Send Mails
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {admin ? (
            <Grid container>
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
                      Send Email <br />
                      <button onClick={selectionAll}>Select All</button>
                      <br />
                      <button onClick={unSelectionAll}>Unselect All</button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {renderUsers.map((user, i) => {
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
                              Select
                            </Button>
                          ) : (
                            <Button onClick={() => deleteEmail(email)}>
                              UnSelect
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
              {!statemessage ? null : (
                <div>
                  <h1> Message </h1>
                  <textarea
                    ref={message}
                    cols="30"
                    rows="10"
                    required
                  ></textarea>{" "}
                  <button type="button" onClick={cancelMessage}>
                    {" "}
                    Cancel Message
                  </button>
                  <button type="button" onClick={sendEmail}>
                    Send Mails
                  </button>
                </div>
              )}
            </Grid>
          ) : null}
        </div>
      )}
    </Container>
  );
};
