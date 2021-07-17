import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "supabase/supabase";

export default function RestorePassword() {
    let history = useHistory();
    const newPassword = useRef("");
    const validatePassword = useRef("");

    let submit = async () => {
        if (newPassword.current.value === validatePassword.current.value) {
            let password = newPassword.current.value;
            const { error } = await supabase.auth.update({ password });
            if (error) alert(error.message);
            else alert("Your password has been updated.");
            history.push("/");
        }
    };

    return (
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
    );
}
