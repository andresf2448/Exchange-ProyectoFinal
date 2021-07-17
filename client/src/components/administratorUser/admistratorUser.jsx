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

  let bannear = async (event) => {
    let userBan = event.target.id;

    await supabase
      .from("RegisteredUsers")
      .update({ bannedUser: "true" })
      .match({ id_user: userBan });
    setReload(reload + 1);
  };

  let desBanear = async (event) => {
    let desban = event.target.id;

    await supabase
      .from("RegisteredUsers")
      .update({ bannedUser: "false" })
      .match({ id_user: desban });
    setReload(reload - 1);
  };

  let toBeAdmin = async (event) => {
    let actAdmin = event.target.id;

    await supabase
      .from("RegisteredUsers")
      .update({ isAdmin: "true" })
      .match({ id_user: actAdmin });
    setReload(reload - 1);
  };

  let noBeAdmin = async (event) => {
    let desAdmin = event.target.id;

    await supabase
      .from("RegisteredUsers")
      .update({ isAdmin: "false" })
      .match({ id_user: desAdmin });
    setReload(reload - 1);
  };

  let resetPassword = async (event) => {
    let emailUser = event.target.id;
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
                        <button onClick={desBanear} id={id_user}>
                          Unblock
                        </button>
                      ) : (
                        <button onClick={bannear} id={id_user}>
                          Blocked
                        </button>
                      )}
                    </TableCell>
                    <TableCell>
                      {isAdmin ? (
                        <button onClick={noBeAdmin} id={id_user}>
                          to user
                        </button>
                      ) : (
                        <button onClick={toBeAdmin} id={id_user}>
                          Up to Admin
                        </button>
                      )}
                    </TableCell>
                    <TableCell>
                      <button onClick={resetPassword} id={email}>
                        Reset
                      </button>
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
