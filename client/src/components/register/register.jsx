import React, { useState } from "react";
import { useHistory } from "react-router";
import { supabase } from "supabase/supabase";

import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
} from "@material-ui/core";

export const Register = () => {
  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    password: "",
    passwordValidate: "",
  });

  function handleOnChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

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

          alert("Please, we send you a message to your email");
          return history.push("/");
        });
    }
  };

  const back = () => {
    history.push("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Register</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl>
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
          <TextField
            required
            label="Repeat Password"
            name="passwordValidate"
            type="password"
            value={data.passwordValidate}
            onChange={handleOnChange}
            color={
              data.password === data.passwordValidate ||
              data.passwordValidate === ""
                ? "primary"
                : "secondary"
            }
          />

          <Button type="submit" variant="contained" color="primary">
            Sing up
          </Button>
          <Button onClick={back} variant="contained" color="primary">
            Back
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};
