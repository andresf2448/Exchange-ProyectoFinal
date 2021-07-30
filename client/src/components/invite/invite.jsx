import React from "react";
import { useRef } from "react";
import { supabase } from "supabase/supabase";
import axios from "axios";
import Swal from "sweetalert2";

import { Grid, Typography, Button } from "@material-ui/core";
import useStyles from "styles";

export const InviteUser = () => {
  let Email = useRef("");
  const classes = useStyles();

  let handleSumit = async (e) => {
    e.preventDefault();
    let inviteEmail = Email.current.value;
    const session = await supabase.auth.session();
    axios.post("https://rocketxchangeapi.herokuapp.com/invite", {
      sendEmail: session.user.email,
      inviteEmail,
    });
    Email.current.value = "";
    Swal.fire({
      title: "Success!",
      text: "Invitation completed",
      icon: "success",
      confirmButtonText: "Cool",
      background: "#1f1f1f",
      confirmButtonColor: "rgb(158, 158, 158)",
    });
  };

  return (
    <Grid container className={classes.inviteCard}>
      <Typography xs={12} variant="h6">
        You can invite a friend to exchange currency with you!
      </Typography>
      <Grid item xs={12}>
        <form onSubmit={handleSumit} style={{ margin: "1%" }}>
          <input
            type="text"
            ref={Email}
            placeholder="Email friend"
            style={{
              margin: "1%",
              borderRadius: "4px",
              width: "45%",
              height: "6vh",
            }}
          />
          <Button className={classes.invitedYellowButton} xs={12} type="submit">
            Invite Friend
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};
