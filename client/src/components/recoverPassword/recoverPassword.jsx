import React, { useRef } from "react";
import { useHistory } from "react-router";

import { supabase } from "supabase/supabase";

export const RecoverPassword = () => {
  const refEmail = useRef();
  const history = useHistory();

  const recoverPassword = (event) => {
    event.preventDefault();

    supabase.auth.api
      .resetPasswordForEmail(refEmail.current.value)
      .then((response) => {
        const { error } = response;
        if (error) return alert(error.message);
        alert("Check your email");
        history.push("/");
      });
  };

  const back = () => {
    history.push("/");
  };

  return (
    <div>
      <span>Recover Password</span>
      <div>
        <label>Email</label>
        <input name="Email" ref={refEmail} type="text" />
      </div>
      <button onClick={back} type="button">
        {"Back "}
      </button>
      <button onClick={recoverPassword}> Send </button>
    </div>
  );
};
