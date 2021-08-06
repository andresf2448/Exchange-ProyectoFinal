import { supabase } from "supabase/supabase";
import { NavBar } from "components/navBar/navBar";
import { useHistory } from "react-router";
import Swal from 'sweetalert2';

import "./home.scss";
import { useEffect } from "react";

export default function Home () {
  const history = useHistory();
  const session = supabase.auth.session();

  async function getRole() {
    let { data } = await supabase
      .from("RegisteredUsers")
      .select("bannedUser")
      .eq("id_user", session.user.id);

    if (data[0]?.bannedUser) {
      Swal.fire({
        title: 'Sorry!',
        text: "Your account is blocked",
        icon: 'error',
        confirmButtonText: 'Cool',
        background: '#1f1f1f',
        confirmButtonColor:'rgb(158, 158, 158)',
      });
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

  useEffect(() => {
    getRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{height: "100vh", minHeight: '100%'}}>
      {session ? (
        <div >
          <NavBar style={{height: "10vh"}}/>
        </div>
      ) : (
        history.push("/")
      )}
    </div>
  );
};
