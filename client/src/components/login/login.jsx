import React, { useState } from "react";
import { useHistory } from "react-router";
import useStyles from 'styles';

import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  FormControl,
  Link,
  Grid,
  Card
} from "@material-ui/core";

import { supabase } from "supabase/supabase";

export default function Login () {
  const history = useHistory();
  const classes = useStyles();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleOnChange(e) {
    setData({
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
    <Container maxWidth="sm" className={classes.loginContainer}>
      {session ? history.push("/home") : null}
      <Card elevation={3} className={classes.loginCard}>  
        <Grid container alignContent="center" >
          <Grid item xs={12} >
            <Typography variant="h3" gutterBottom className={classes.loginGridItem}> LOGIN</Typography>
            <form onSubmit={handleSubmit} className={classes.loginForm}>
              <FormControl>
                <TextField
                  required
                  label="Email"
                  name="email"
                  type="text"
                  value={data.email}
                  onChange={handleOnChange}
                  color="secondary"
                />
                <TextField
                  required
                  label="Password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={handleOnChange}
                  color="secondary"
                />

                {/* this button goes first for the submit function when pressing enter */}
                <ButtonGroup className={classes.loginGridItem}>
                  <Button type="submit" variant="contained" color="secondary">
                    Login
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={singUpRoute}>
                    Sing up
                  </Button>
                </ButtonGroup>
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={12} className={classes.loginGridItem}>
            <Link className={classes.text} component="button" onClick={()=>recoverPassword()}>
              Forgot your password?
            </Link>
          </Grid>
          <Grid item xs={12} className={classes.loginGridItem}>
            <Link className={classes.text} component="button" onClick={() => handleOAuthLogin("google")}>
              Sign in with your Google account
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};