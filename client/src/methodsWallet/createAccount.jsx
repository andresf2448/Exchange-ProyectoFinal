import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import useStyles from "styles";
import { supabase } from "supabase/supabase";

export default function CreateAccount() {
  const [publicKey, setPublicKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const [hasWallet, setHasWallet] = useState(false);
  const classes = useStyles();
  const userName = useRef("");
  const session = supabase.auth.session();

  const userExist = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    if (data.length > 0) {
      return setHasWallet(true);
    }
    return setHasWallet(false);
  };

  userExist();

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

    setPublicKey(public_key);
    setSecretKey(secret_key);

    await supabase.from("datauser").insert([
      {
        id_user,
        username,
        email,
        public_key,
        stellar_address: null,
      },
    ]);

    await supabase.from("wallet").insert([
      {
        id_user,
        wallet_number: null,
        secret_key,
      },
    ]);

    return setHasWallet(true)
  };

  return (
    <div>
      {publicKey && <div> Esta es su publicKey: {publicKey} </div>}
      {secretKey && <div> Esta es su secretKey: {secretKey} </div>}

      {hasWallet ? null : (
        <form onSubmit={createdAccounts}>
          <label> User Name :</label>

          <input ref={userName} required />

          <Button className={classes.button} color="secondary" type="submit">
            Crear Wallet
          </Button>
        </form>
      )}
    </div>
  );
}
