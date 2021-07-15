import { supabase } from "supabase/supabase";
import { NavBar } from "components/navBar/navBar";
import { useHistory } from "react-router";

import "./home.scss";

export const Home = () => {
  const history = useHistory();
  const session = supabase.auth.session();

  async function getRole() {
    let { data } = await supabase
      .from("RegisteredUsers")
      .select("bannedUser")
      .eq("id_user", session.user.id);

    if (data[0].bannedUser) {
      alert("Your account is blocked");
      await supabase.auth.signOut();
      history.push("/");
    }

    if (data.length === 0) {
      const { user } = session;
      const { email, id } = user;

      await supabase.from("RegisteredUsers").insert([
        {
          id_user: id,
          email,
        },
      ]);
    }
  }

  // ya quedo implementado el banned se sabe si esta o no baneado pero no logre
  // como decir que se devuelva a home o salga una ventana de baneo si esta baneado en true

  getRole();

  return (
    <div>
      {session ? (
        <div>
          <NavBar />
        </div>
      ) : (
        history.push("/")
      )}
    </div>
  );
};
