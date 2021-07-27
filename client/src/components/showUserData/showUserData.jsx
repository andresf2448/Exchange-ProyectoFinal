import {  Grid, Typography } from "@material-ui/core";
import { supabase } from "supabase/supabase";


export const ShowUserData = () => {
  let { user } = supabase.auth.session();

  let { email } = user;

  return (
      <Grid container style={{display: 'flex', paddingLeft: '1%'}}>
        <Typography>{email}</Typography>
      </Grid>
  );
};
