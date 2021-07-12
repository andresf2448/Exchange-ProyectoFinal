import React, { useState, useRef } from "react";
import axios from "axios";
import { supabase } from "supabase/supabase";

export default function CreateAccount() {
  const session = supabase.auth.session();
  const userName = useRef("");
  const [publicKey, setPublicKey] = useState()
  const [secretKey, setSecretKey] = useState()

  const createdAccounts = async (event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:3001/createWallet");
    const { publicKey, secretKey } = response.data;
    const { user } = session;

    let id_user = user.id;
    let username = userName.current.value;
    let email = user.email;
    let public_key = publicKey;
    let secret_key = secretKey;

    setPublicKey(public_key)
    setSecretKey(secret_key)

    await supabase.from("datauser").insert([
      {
        id_user,
        username,
        email,
        public_key,
        federation_Address: null,
      },
    ]);

    await supabase.from("wallet").insert([
      {
        id_user,
        wallet_number: null,
        secret_key,
      },
    ]);
  };
  
  return (
    <div>
    {publicKey && <div> Esta es su publicKey: {publicKey} </div>}
    {secretKey && <div> Esta es su secretKey: {secretKey} </div>}
      <form onSubmit={createdAccounts}>
        {/* <label > User Name :</label> */}
        {/* <input ref={userName} /> */}
        {!publicKey && <button type="submit">Crear Wallet</button>}
      </form>
    </div>
  );
}