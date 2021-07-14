import { useState } from "react";
import { useHistory } from "react-router";
import { supabase } from "supabase/supabase";

export const AdministratorUser = () => {
  const history = useHistory();
  const session = supabase.auth.session();
  const { user } = session;
  let id = user.id;
  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  async function getRole() {
    let { data } = await supabase
      .from("datauser")
      .select(`*`)
      .eq("id_user", session.user.id);

    let info = data[0].isAdmin;
    if (info) {
      setAdmin(true);
    }
  }

  async function getUsers() {
    let { data } = await supabase.from("datauser").select("*");

    setUsers(data);
  }

  getUsers();
  getRole();

  let suspender = async (event) => {
    let user = event.target.id;

    const { data, error } = await supabase
      .from("datauser")
      .update({ Banned: "true" })
      .match({ id_user: user });

    console.log(data, error);
  };

  let back = () => {
    history.push("/");
  };

  return (
    <div>
      {admin ? (
        <div>
          <table>
            <tr>
              <td></td>
              <td>email</td>
              <td>username</td>
              <td>public_key</td>
            </tr>
            {users.map((user, i) => {
              const { email, username, public_key, id_user } = user;
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{email}</td>
                  <td>{username}</td>
                  <td>{public_key}</td>
                  <td>
                    {id_user === id ? null : (
                      <button onClick={suspender} id={id_user}>
                        Bloquear
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </table>
          <button type="button" onClick={back}>
            {"Volver "}
          </button>
        </div>
      ) : null}
    </div>
  );
};
