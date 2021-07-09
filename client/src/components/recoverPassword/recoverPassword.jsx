import React, { useRef } from "react";
import { useHistory } from "react-router";

import useStyles from 'styles.js'

import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl
} from "@material-ui/core";

import { supabase } from "supabase/supabase";

export const RecoverPassword = () => {
  const refEmail = useRef();
  const history = useHistory();
  
  const classes = useStyles();

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
    <Container maxWidth="sm" justifyContent="center">
      <FormControl>
        <Typography variant="h4">Recover Password</Typography>
          <TextField  required label= "Email" name="Email" ref={refEmail} type="text" />
        <Button className={classes.button} variant="contained" color="primary" onClick={back}>
          {"Back "}
        </Button>
        <Button className={classes.button} variant="contained"  color="primary" onClick={recoverPassword}> Send </Button>
      </FormControl>
    </Container>
  );
};
