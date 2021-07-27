import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "supabase/supabase";
import Swal from "sweetalert2";

export default function RestorePassword() {
  const session = supabase.auth.session();
  const { user } = session;
  let id_user = user.id;

  const [hasResetPassword, setHasResetPassword] = useState(false);

  async function hasResetFunction() {
    let hasReset = await supabase
      .from("RegisteredUsers")
      .select("resetPassword")
      .eq("id_user", session.user.id);
    if (hasReset.data[0].resetPassword === true) setHasResetPassword(true);
  }

  useEffect(() => {
    hasResetFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let history = useHistory();
  const newPassword = useRef("");
  const validatePassword = useRef("");

  let submit = async () => {
    if (newPassword.current.value === validatePassword.current.value) {
      let password = newPassword.current.value;
      const { error } = await supabase.auth.update({ password });

      await supabase
        .from("RegisteredUsers")
        .update({ resetPassword: "false" })
        .match({ id_user });

      if (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Cool",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: "Your password has been updated.",
          icon: "success",
          confirmButtonText: "Cool",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        });
        history.push("/");
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Passwords don't match",
        icon: "error",
        confirmButtonText: "Ups",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }
  };

  return (
    <Container>
      {hasResetPassword ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            type="password"
            inputRef={newPassword}
            placeholder="Your new password"
          />
          <TextField
            type="password"
            inputRef={validatePassword}
            placeholder="Confirm your password"
          />
          <Button color="primary" variant="contained" onClick={submit}>
            Send
          </Button>
        </Grid>
      ) : (
        <Container>
          <Typography variant="h4">No pediste cambio</Typography>
        </Container>
      )}
    </Container>
  );
}
