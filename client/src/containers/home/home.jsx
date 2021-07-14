import { useState } from "react";

import { supabase } from "supabase/supabase";
import { NavBar } from "components/navBar/navBar";
import { useHistory } from "react-router";
import { Administrador } from "components/administrator/administrator";

import "./home.scss";

export const Home = () => {
  const history = useHistory();
  const session = supabase.auth.session();
  const [admin, setAdmin] = useState(false);
  const [banned, setBanned] = useState(false);

  async function getRole() {
    let { data } = await supabase
      .from("RegisteredUsers")
      .select("isAdmin,bannedUser ")
      .eq("id_user", session.user.id);

    if (data[0].isAdmin) {
      setAdmin(true);
    }

    console.log(data[0].bannedUser);
    if (data[0].bannedUser) {
      setBanned(true);
    }
  }

  // ya quedo implementado el banned se sabe si esta o no baneado pero no logre
  // como decir que se devuelva a home o salga una ventana

  getRole();

  return (
    <div>
      {session ? (
        admin ? (
          <div>
            <Administrador />
            <NavBar />
          </div>
        ) : (
          <div>
            <NavBar />
          </div>
        )
      ) : (
        history.push("/")
      )}
    </div>
  );
};
