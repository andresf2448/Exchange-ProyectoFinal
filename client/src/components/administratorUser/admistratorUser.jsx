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
    let user = event.target.id;

    try {
      await supabase
        .from("RegisteredUsers")
        .update({ bannedUser: "true" })
        .match({ id_user: user });
    } catch (error) {
      console.log(error);
    }

    setReload(reload + 1);
  };

  let desBanear = async (event) => {
    let user = event.target.id;

    await supabase
      .from("RegisteredUsers")
      .update({ bannedUser: "false" })
      .match({ id_user: user });
    setReload(reload - 1);
  };

  let toBeAdmin = async (event) => {
    let user = event.target.id;

    await supabase
      .from("isAdmin")
      .update({ bannedUser: "true" })
      .match({ id_user: user });
    setReload(reload - 1);
  };

  let noBeAdmin = async (event) => {
    let user = event.target.id;

    await supabase
      .from("isAdmin")
      .update({ bannedUser: "false" })
      .match({ id_user: user });
    setReload(reload - 1);
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
                <TableCell>Block </TableCell>
                <TableCell>Admin </TableCell>
                {/* <TableCell>public_key </TableCell> */}
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
                    {/*  <td>{username}</td>
                    <td>{public_key}</td> */}
                    <TableCell>
                      {bannedUser ? (
                        <Button
                          onClick={desBanear}
                          id={id_user}
                          color="primary"
                          variant="outlined"
                        >
                          Desbloquear
                        </Button>
                      ) : (
                        <Button
                          onClick={bannear}
                          id={id_user}
                          color="secondary"
                          variant="outlined"
                        >
                          Bloquear
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {isAdmin ? (
                        <Button
                          onClick={toBeAdmin}
                          id={id_user}
                          color="primary"
                          variant="outlined"
                        >
                          to user
                        </Button>
                      ) : (
                        <Button
                          onClick={noBeAdmin}
                          id={id_user}
                          color="secondary"
                          variant="outlined"
                        >
                          Up to Admin
                        </Button>
                      )}
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