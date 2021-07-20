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

// el compoonente administratorUser se renderiza 3  veces al iniciar  cuando se utiliza algo de aca . mirar porque

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

  function sendEmail(){
    return
  }

  async function validateRole() {
    let { data } = await supabase
      .from("RegisteredUsers")
      .select(`*`)
      .eq("id_user", session.user.id);

    let info = data[0].isAdmin;

    if (info) setAdmin(true);

    if (!info) history.push("/home");
  }

  async function getUsers() {
    let { data } = await supabase.from("RegisteredUsers").select("*");

    setUsers(data);
  }

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
    const data = await supabase.auth.api.resetPasswordForEmail(emailUser);
    console.log(data);
  };

  useEffect(() => {
    getUsers();
    validateRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  let back = () => {
    history.push("/");
  };

  let filter = users.filter((user) => user.id_user !== id);
  let renderUsers = filter.sort((a, b) => (a.email > b.email ? 1 : -1));

  return (
    <Container>
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
                <TableCell>Send message </TableCell>
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
                        <Button onClick={()=>desBanear(id_user)}>
                          Unblock
                        </Button>
                      ) : (
                        <Button onClick={()=>bannear(id_user)}>
                          Blocked
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {isAdmin ? (
                        <Button onClick={()=>noBeAdmin(id_user)}>
                          to user
                        </Button>
                      ) : (
                        <Button onClick={()=>toBeAdmin(id_user)}>
                          Up to Admin
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button onClick={()=>resetPassword(email)}>
                        Reset
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={()=>sendEmail()}>
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
          <Button
            type="button"
            onClick={back}
            color="primary"
            variant="contained"
            className={classes.buttonBack}
          >
            {"Volver "}
          </Button>
        </Grid>
      ) : null}

    </Container>
  );
};
