import React from "react";
import { useRef } from "react";
import { supabase } from "supabase/supabase";
import axios from 'axios';
import {Grid, Typography, Button } from "@material-ui/core";
import useStyles from 'styles';

export const InviteUser = () => {
  let Email = useRef("");
  const classes = useStyles();

  let handleSumit = async (e) => {
    e.preventDefault();
    let inviteEmail = Email.current.value;
    const session = await supabase.auth.session();
    axios.post('http://localhost:3001/invite', {sendEmail: session.user.email, inviteEmail});
    Email.current.value = "";
    alert("Invite succes");
  };

  return (
    <Grid container xs={12} className={classes.inviteCard}>
      <Typography itemxs={12} variant='h6'>You can invite a friend to exchange currency with you!</Typography>
      <Grid item xs={12}>
        <form onSubmit={handleSumit} style={{margin:'1%'}}>
          <input type="text" ref={Email} placeholder="Email friend" style={{margin:'1%', borderRadius:'4px', width:'45%', height: '5vh'}}/>
          <Button className={classes.invitedYellowButton} item xs={12} type="submit">Invite Friend</Button>
        </form>
      </Grid>
    </Grid>
  );
};