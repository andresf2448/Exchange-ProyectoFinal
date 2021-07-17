import React, { useRef } from "react";
import { useHistory } from "react-router";

import { supabase } from "supabase/supabase";

export const RecoverPassword = () => {
  const refEmail = useRef();
  const history = useHistory();

  const recoverPassword = async (event) => {
    event.preventDefault();

    alert(refEmail.current.value);

    await supabase.auth.api
      .resetPasswordForEmail(refEmail.current.value)
      .then((response) => {
        const { error } = response;
        console.log(response);
        if (error) return alert(error.message);
        alert("Check your email");
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const back = () => {
    history.push("/");
  };

  return (
    <div>
      <form onSubmit={recoverPassword}>
        <input required label="Email" name="Email" ref={refEmail} type="text" />
        <button type="submit"> enviar </button>
      </form>
      <button onClick={back}>Volver</button>
    </div>
  );
};
