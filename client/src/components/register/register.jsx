import React, { useState } from "react";
import { useHistory } from "react-router";
import { supabase } from "../../supabase/supabase";

export const Register = () => {
  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    password: "",
    passwordValidate: "",
  });

  function handleOnChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  //! --------------------------------------------------------------
  //A user with this email address has already been registered

  //! --------------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (data.password === data.passwordValidate) {
      
      await supabase.auth
        .signUp({
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          const { error } = response;

          if (error) return alert(error.message);
          // se debe cambiar esta ruta por el home del UR
          alert("congratulations your account has been created");
          return history.push("/");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Error in Password");
    }
  };


  const back = () => {
    // aca seria el landing page 
    history.push("/");
  };

  return (
    <div>
      <label> Register </label>
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

        <div>
          <label>Repeat Password</label>
          <input
            name="passwordValidate"
            placeholder="Repeat password"
            type="password"
            value={data.passwordValidate}
            onChange={handleOnChange}
            required
          />
          {data.password === data.passwordValidate ||
          data.passwordValidate === ""
            ? null
            : "No coinciden"}
        </div>

        <button type="submit">Sing up</button>
      </form>

      <button onClick={back} type="button">
        {"volver "}
      </button>
    </div>
  );
};