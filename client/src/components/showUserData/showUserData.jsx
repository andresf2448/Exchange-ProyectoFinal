import {  Grid, Typography } from "@material-ui/core";
import { supabase } from "supabase/supabase";


export const ShowUserData = () => {
  let { user } = supabase.auth.session();

  let { full_name } = user.user_metadata;

  return (
      <Grid container style={{display: 'flex'}}>
        <Typography>{full_name}</Typography>
      </Grid>

  );
};
