import { Grid, Typography, Button, ButtonGroup } from "@material-ui/core";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { supabase } from "supabase/supabase";

export const ShowUserData = () => {
  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: "rgb(255, 217, 112)",
      },
      secondary: {
        main: "rgb(10, 147, 168)",
      },
    },
  });

  let { user } = supabase.auth.session();

  let { email } = user;

  return (
    <Grid container style={{ display: "flex", paddingLeft: "1%" }}>
      <Grid item xs={10}>
        <Typography>{email}</Typography>
      </Grid>
      <Grid item xs={2}>
        <MuiThemeProvider theme={buttonTheme}>
          <ButtonGroup>
            <Button variant="contained" color="primary">
              Withdraw
            </Button>
            <Button variant="contained" color="secondary">
              Deposit
            </Button>
          </ButtonGroup>
        </MuiThemeProvider>
      </Grid>
    </Grid>
  );
};