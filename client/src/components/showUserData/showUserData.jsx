import { Badge, Container, Grid } from "@material-ui/core";
import useStyles from "styles.js";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import { supabase } from "supabase/supabase";


export const ShowUserData = () => {
  let { user } = supabase.auth.session();

  let { email } = user;

  const classes = useStyles();
  return (
    <Container>
      <Grid container justifyContent="left">
        <Badge className={classes.badge}>
          <DirectionsRunIcon />
        </Badge>
        <Badge className={classes.badge}>USER: {email}</Badge>
        <Badge className={classes.badge}>ACCOUNT</Badge>
        <Badge className={classes.badge}>BALANCE</Badge>
        <Badge className={classes.badge}>SOMETHING ELSE...</Badge>
      </Grid>
    </Container>
  );
};
