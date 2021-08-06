import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Grid,
  Typography,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import useStyles from "styles";
import { supabase } from "supabase/supabase";
import MuxedAccount from "methodsWallet/muxedAccount.jsx";
import HashLoader from "react-spinners/HashLoader";
import { useSelector, useDispatch } from "react-redux";
import {
  getAccount,
  getBalance,
  getFullBalance,
} from "../redux/actions/actions";

export default function CreateAccount() {
  const classes = useStyles();
  const session = supabase.auth.session();
  const [userName, setUserName] = useState("");
  const [spinner, setSpinner] = useState(true);
  const ourMediaQuery = useMediaQuery("(min-width:820px)");

  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const createdAccounts = async (event) => {
    event.preventDefault();
    setSpinner(true);
    const response = await axios.get("http://localhost:3001/createWallet");

    const { publicKey, secretKey } = response.data;
    const { user } = session;
    let id_user = user.id;
    let username = userName;
    let email = user.email;
    let public_key = publicKey;
    let secret_key = secretKey;

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
    dispatch(getAccount());
    dispatch(getBalance());
    dispatch(getFullBalance());
    setSpinner(false);
  };

  useEffect(() => {}, [account]);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 500);
  }, []);

  return (
    <Grid container>
      {spinner ? (
        <HashLoader color={"#ffd523"} size={20} />
      ) : account ? (
        <Grid style={{ maxWidth: "100%", width: "fit-content" }}>
          <Grid item xs={12}>
            <Typography variant={ourMediaQuery ? "h6" : "subtitle2"}>
              PublicKey |
            </Typography>
            <Typography
              variant={ourMediaQuery ? "h6" : "subtitle2"}
              style={{ wordWrap: "break-word" }}
            >
              {" "}
              {account.publicKey}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant={ourMediaQuery ? "h6" : "subtitle2"}
              style={{ wordWrap: "break-word" }}
            >
              {" "}
              SecretKey | {account.secretKey}
            </Typography>
          </Grid>
          <Divider className={classes.divider} />
          <br />
          <MuxedAccount pk={account.publicKey} />
        </Grid>
      ) : (
        <form onSubmit={createdAccounts}>
          <label> User Name </label>
          <input ref={userName} required />
          <Button className={classes.yellowButton} type="submit">
            Crear Wallet
          </Button>
        </form>
      )}
    </Grid>
  );
}
