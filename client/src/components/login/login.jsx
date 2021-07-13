import React, { useState } from "react";
import { useHistory } from "react-router";

import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  Link,
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
    return history.push("/home");
  };

  const singUpRoute = () => {
    history.push("/register");
  };

  const recoverPassword = () => {
    history.push("/recoverPassword");
  };

  let session = supabase.auth.session();

  const handleOAuthLogin = async (provider) => {
    let info = await supabase.auth.signIn({ provider });

    if (info.error) {
      alert(info.error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      {session ? history.push("/home") : null}
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
              
           {/* this button goes first for the submit function when pressing enter */}
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button> 
          <Button variant="contained" color="primary" onClick={singUpRoute}>
            Sing up
          </Button>
          <Link component="button" onClick={recoverPassword}>
            Recover password
          </Link>
        </FormControl>
      </form>

      <Link
        component="button"
        onClick={() => handleOAuthLogin("google")}
      >
        Sign in with your Google account
      </Link>
      <div></div>
    </Container>
  );
};
