import React, { useState } from "react";
import { useHistory } from "react-router";

import { supabase } from "../../supabase/supabase";

export const Login = () => {
  const history = useHistory();

  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  function handleOnChange(e) {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  //! ---------------------------------
  //! en consola porque sale
  // error de email no confirmado
  // error Invalid email or password
  //! ---------------------------------

  /*   const handleSubmit = async (event) => {
    event.preventDefault();
    await supabase.auth
      .signIn({
        email: data.email,  
        password: data.password,
      })
      .then((response) => {
        const { error } = response;
        if (error) return alert(error.message);
        // se debe cambiar esta ruta por el home del UR
        return history.push("/logeado");
      })
      // no esta haciendo nada el catch
      .catch((error) => console.log(error));
  }; */

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let info = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      });

      if (info.error) return alert(info.error.message);
      return history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const singUpRoute = () => {
    history.push("/register");
  };

  return (
    <div>
      <label> Login</label>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="text"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={data.password}
            onChange={handleOnChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <button type="button" onClick={singUpRoute}>
        Sing up
      </button>
    </div>
  );
};