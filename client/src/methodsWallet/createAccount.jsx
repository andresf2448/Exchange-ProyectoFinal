import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import useStyles from "styles";
import { supabase } from "supabase/supabase";
import { useEffect } from "react";

export default function CreateAccount() {
  const classes = useStyles();
  const session = supabase.auth.session();
  const userName = useRef("");
  const [publicKey, setPublicKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const [hasWallet, setHasWallet] = useState(false);
  const [publicKeyUser, setPublicKeyUser] = useState(null);
  const [secretKeyUser, setSecretKeyUser] = useState(null);

  const userExist = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    if (data.length === 0) {
      setHasWallet(false);
    }
    if (data.length > 0) {
      let secret = await supabase
        .from("wallet")
        .select("secret_key")
        .eq("id_user", session.user.id);

      setSecretKeyUser(secret.data[0].secret_key);
      setPublicKeyUser(data[0].public_key);
      setHasWallet(true);
    }
  };

  useEffect(() => {
    userExist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKeyUser]);

  const createdAccounts = async (event) => {
    event.preventDefault();
    const response = await axios.get("http://localhost:3001/createWallet");
    const { publicKey, secretKey } = response.data;
    const { user } = session;

    console.log(response);
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
  };

  return (
    <div>
      {hasWallet ? (
        <div>
          {<div> Esta es su publicKey: {publicKeyUser} </div>}
          <br />
          {<div> Esta es su secretKey: {secretKeyUser} </div>}
        </div>
      ) : (
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
