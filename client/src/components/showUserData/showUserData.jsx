import { Badge, Container, Grid } from "@material-ui/core";
import useStyles from "styles.js";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';import { supabase } from "supabase/supabase";


export const ShowUserData = () => {
  let { user } = supabase.auth.session();

  let { email } = user;

  const classes = useStyles();
  return (
    <Container>
      <Grid container >
        <Badge className={classes.badge}>
          <MonetizationOnIcon />
        </Badge>
        <Badge className={classes.badge}>Logged as: {email}</Badge>
     
      </Grid>
    </Container>
  );
};
