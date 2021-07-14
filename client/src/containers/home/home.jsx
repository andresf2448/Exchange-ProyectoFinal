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

  async function getRole() {
    let { data } = await supabase
      .from("datauser")
      .select("*")
      .eq("id_user", session.user.id);

    if (data.length !== 0) {
      let info = data[0].Role;
      if (info) setAdmin(true);
    }
  }

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
