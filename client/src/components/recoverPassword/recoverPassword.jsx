import React from "react";
import { useHistory } from "react-router";
import Swal from 'sweetalert2'
import useStyles from "styles.js";

import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Grid,
  FormControl,
  Card
} from "@material-ui/core";

import { supabase } from "supabase/supabase";
import { useState } from "react";

export default function RecoverPassword() {
  // const refEmail = useRef();
  const [email, setEmail] = useState("");
  const history = useHistory();

  const classes = useStyles();

  const recoverPassword = async (event) => {
    event.preventDefault();

    await supabase
      .from("RegisteredUsers")
      .update({ resetPassword: "true" })
      .match({ email });

    await supabase.auth.api.resetPasswordForEmail(email).then((response) => {
      const { error } = response;
      if (error) return Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool',
        background: '#1f1f1f',
        confirmButtonColor:'rgb(158, 158, 158)',
      });

      Swal.fire({
        text: 'Check your email',
        icon: 'success',
        confirmButtonText: 'Cool',
        background: '#1f1f1f',
        confirmButtonColor:'rgb(158, 158, 158)',
      })
    });
    await supabase.auth.signOut();
    history.push("/");
  };

  const handleOnChange = (event) => {
    setEmail(event.target.value);
  };

  const back = () => {
    history.push("/");
  };

  return (
    <Container maxWidth="sm" className={classes.loginContainer}>
      <Card elevation={3} className={classes.loginCard}> 
        <Grid container alignContent="center" >
          <Grid item xs={12} >
            <Typography  variant="h3" gutterBottom className={classes.loginGridItem}>Recover Password</Typography>
            <form onSubmit={() => recoverPassword()} className={classes.loginForm}>
              <FormControl style={{marginBottom:'20px'}}>
                <TextField
                  required
                  label="Email"
                  name="Email"
                  type="text"
                  value={email}
                  onChange={handleOnChange}
                  style={{ marginBottom: "3px" }}
                  />
                <ButtonGroup fullWidth={true}>
                  <Button
                  //className={classes.loginGridItem}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={recoverPassword}
                  >
                    Send
                  </Button>
                  <Button
                    // className={classes.loginGridItem}
                    variant="outlined"
                    color="secondary"
                    onClick={back}
                    >
                    Back
                  </Button>
                </ButtonGroup>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
