import React, { useState } from "react";
import { useHistory } from "react-router";

import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
} from "@material-ui/core";

import { supabase } from "supabase/supabase";

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    let info = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    });

    if (info.error) return alert(info.error.message);
    return history.push("/home/home");
  };

  const singUpRoute = () => {
    history.push("/register");
  };

  const recoverPassword = () => {
    history.push("/recoverPassword");
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Typography variant="h3"> LOGIN</Typography>
          <TextField
            required
            label="Email"
            name="email"
            type="text"
            value={data.email}
            onChange={handleOnChange}
          />
          <TextField
            required
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleOnChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={singUpRoute}>
            Sing up
          </Button>
          <Button variant="contained" color="primary" onClick={recoverPassword}>
            Recover password
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};
