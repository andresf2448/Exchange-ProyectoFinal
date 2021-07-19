import React from "react";
import { useHistory } from "react-router";

import useStyles from 'styles.js'

import {
  Container,
  Typography,
  Button,
  TextField,
  Grid
} from "@material-ui/core";

import { supabase } from "supabase/supabase";
import { useState } from "react";

export const RecoverPassword = () => {
  // const refEmail = useRef();
  const [email, setEmail]= useState('')
  const history = useHistory();
  
  const classes = useStyles();

  const recoverPassword = (event) => {
    event.preventDefault();

    supabase.auth.api
      .resetPasswordForEmail(email)
      .then((response) => {
        const { error } = response;
        if (error) return alert(error.message);
        alert("Check your email");
        history.push("/");
      });
  };

  const handleOnChange=(event) =>{
    setEmail(event.target.value);
  }
  

  const back = () => {
    history.push("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Recover Password</Typography>
      <Grid container >
        <Grid item xs={12}>
          <form onSubmit={()=>recoverPassword()}>
              <Grid item xs={12}>
                <TextField 
                required 
                label= "Email" 
                name="Email" 
                type="text" 
                value={email} 
                onChange={handleOnChange}
                style={{marginBottom:'3px'}}
                />
              </Grid>
              <Grid item xs={12}>
                <Button className={classes.button} type='submit' variant="contained"  color="primary" onClick={recoverPassword}>
                  Send 
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button className={classes.button} variant="contained" color="primary" onClick={back}>
                  Back
                </Button>
              </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
