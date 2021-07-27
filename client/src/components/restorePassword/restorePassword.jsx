import { Container, Grid, TextField, Button, Typography, FormControl } from "@material-ui/core";
import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "supabase/supabase";

export default function RestorePassword() {
    const session = supabase.auth.session();
    const { user } = session;
    let id_user = user.id;

    const [hasResetPassword, setHasResetPassword] = useState(false);

    async function hasResetFunction() {
        let hasReset = await supabase
        .from('RegisteredUsers')
        .select('resetPassword')
        .eq("id_user", session.user.id);
        if(hasReset.data[0].resetPassword === true) setHasResetPassword(true);
    }

    useEffect(() => {
        hasResetFunction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
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
            
            if (error) alert(error.message);
            else alert("Your password has been updated.");
            history.push("/");
        }
    };

    return (
        <Container>
            {hasResetPassword ?
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Typography variant="h4">Write your new password</Typography>
                    <FormControl margin="normal">

                    <TextField
                        type="password"
                        ref={newPassword}
                        placeholder="Your new password"
                        style={{paddingBottom: 10}}
                        />
                    <TextField
                        type="password"
                        ref={validatePassword}
                        placeholder="Confirm your password"
                        style={{paddingBottom: 10}}
                        />
                    <Button 
                        color="secondary"
                        variant="contained" 
                        onClick={submit} 
                        style={{paddingBottom: 10}}
                        >
                        Send
                    </Button>
                    </FormControl>
                </Grid>
                :
                <Container>
                    <Typography variant="h4" align="center">
                        No pediste cambio
                    </Typography>
                </Container>
            }
        </Container>
    );
}
