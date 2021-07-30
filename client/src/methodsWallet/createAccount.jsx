import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Grid, Typography, Divider } from "@material-ui/core";
import useStyles from "styles";
import { supabase } from "supabase/supabase";
import MuxedAccount from 'methodsWallet/muxedAccount.jsx';
import HashLoader from "react-spinners/HashLoader";


export default function CreateAccount() {
  const classes = useStyles();
  const session = supabase.auth.session();
  const userName = useRef("");
  const [publicKey, setPublicKey] = useState();  // eslint-disable-line no-unused-vars
  const [secretKey, setSecretKey] = useState();  // eslint-disable-line no-unused-vars
  const [hasWallet, setHasWallet] = useState(false);
  const [publicKeyUser, setPublicKeyUser] = useState(null);
  const [secretKeyUser, setSecretKeyUser] = useState(null);
  const [spinner, setSpinner] = useState(true);

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
    setSpinner(true);
    const response = await axios.get("https://rocketxchangeapi.herokuapp.com/createWallet");
    
    const { publicKey, secretKey } = response.data;
    const { user } = session;

    let id_user = user.id;
    let username = userName.current.value;
    let email = user.email;
    let public_key = publicKey;
    let secret_key = secretKey;

    setPublicKey(() => public_key);
    setSecretKey(() => secret_key);
   
  
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
    userExist();
    setHasWallet(true);
    setSpinner(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 2000);
  },[])

  return (
    <div>
      {spinner ? <HashLoader color={'#ffd523'} size={20}/> :
        hasWallet ? (
          <Grid item key={12}>
            {<Typography variant='subtitle1'>PublicKey | {publicKeyUser}</Typography>}
            {<Typography variant='subtitle1'>SecretKey | {secretKeyUser}</Typography>}
            <Divider className={classes.divider}/>
            <br/>
            <MuxedAccount pk={publicKeyUser}/>
          </Grid>
          
          ) : (
            <form onSubmit={createdAccounts}>
              <label> User Name </label>
              <input ref={userName} required />
              <Button className={classes.yellowButton}  type="submit">
                Crear Wallet
              </Button>
            </form>
          )
      }
    </div>
  );
}