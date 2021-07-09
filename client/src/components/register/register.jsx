import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { supabase } from "supabase/supabase";
import { validate } from "./validate";

import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
} from "@material-ui/core";

export const Register = () => {
  const history = useHistory();

  const [error, setError] = useState({
    email: '',
    password: "",
    passwordValidate: "",
    isError: true
  })
  const [submit, setSubmit] = useState(false)

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
    setError(validate({
      ...data,
      [event.target.name]: event.target.value
    }))
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

          alert("congratulations your account has been created");
          return history.push("/");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Error in Password");
    }
  };

  const back = () => {
    history.push("/");
  };
  useEffect(() => {
    if(error.isError) {
      setSubmit(false)
    } else {
      setSubmit(true)
    }
  }, [error])

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Register</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            required
            label={error.email === '' ? 'Email' : error.email}
            name="email"
            type="text"
            value={data.email}
            onChange={handleOnChange}
            color={
              error.email === ''
                ? "primary"
                : "secondary"
            }
          />
           <TextField
            required
            label={error.password === '' ? 'Password' : error.password}
            name="password"
            type="password"
            value={data.password}
            onChange={handleOnChange}
            color={
              error.password === ''
                ? "primary"
                : "secondary"
            }
          />
          <TextField
            required
            label={error.passwordValidate === '' ? 'Repeat password' : error.passwordValidate}
            name="passwordValidate"
            type="password"
            value={data.passwordValidate}
            onChange={handleOnChange}
            color={
              error.passwordValidate ===  ""
                ? "primary"
                : "secondary"
            }
          />

          <Button type="submit" variant="contained" color="primary" disabled={!submit} >
            Sing up
          </Button>
          <Button onClick={back} variant="contained" color="primary" >
            Back
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};
