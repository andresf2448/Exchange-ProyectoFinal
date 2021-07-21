import { Container } from "@material-ui/core";
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
        console.log("db ", hasReset.data[0].resetPassword)
        if(hasReset.data[0].resetPassword === true) {
        setHasResetPassword(true);
        console.log("entre");
        }
        console.log(" state es ", hasResetPassword);
    }

    useEffect(() => {
        hasResetFunction()
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
                <div>
                    <input
                        type="password"
                        ref={newPassword}
                        placeholder="your new password"
                    />
                    <input
                        type="password"
                        ref={validatePassword}
                        placeholder="confirm your password"
                    />
                    <button onClick={submit}>Send</button>
                </div>
                :
                <div>No pediste cambio</div>
            }
        </Container>
    );
}
