import React from "react";
import { useRef } from "react";
import { supabase } from "supabase/supabase";
import axios from 'axios';

export const InviteUser = () => {
  let Email = useRef("");

  let handleSumit = async (e) => {
    e.preventDefault();
    let inviteEmail = Email.current.value;
    const session = await supabase.auth.session();
    axios.post('http://localhost:3001/invite', {sendEmail: session.user.email, inviteEmail});
    Email.current.value = "";
    alert("Invite succes");
  };
  return (
    <div>
      <form onSubmit={handleSumit}>
        <input type="text" ref={Email} placeholder="Email friend" />
        <button type="submit">Invite Friend</button>
      </form>
    </div>
  );
};