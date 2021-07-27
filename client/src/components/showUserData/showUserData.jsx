import {  Grid, Typography } from "@material-ui/core";
import { supabase } from "supabase/supabase";
import useStyles from 'styles';


export const ShowUserData = () => {
  const classes = useStyles();
  let { user } = supabase.auth.session();

  let { email } = user;

  return (
      <Grid container style={{display: 'flex', paddingLeft: '1%'}}>
        <Typography>{email}</Typography>
      </Grid>
  );
};
