import React, { useState } from "react";
import StellarSdk from "stellar-sdk";
import { Divider } from "@material-ui/core";
import useStyles from "styles";
import { supabase } from "../supabase/supabase";
// import CreateAccount from "./createAccount";
import HashLoader from "react-spinners/HashLoader";

export default function BalanceAccount() {
  const [account, setAccount] = useState(false);
  const [user, setUser] = useState(false);
  const classes = useStyles();

  const session = supabase.auth.session();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const userExist = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    if (data.length === 0) setUser(false);
    if (data.length > 0) {
      setUser(() => true);
      getBalance()
      
    }
  };

  const getBalance = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    server
      .loadAccount(data[0]?.public_key)
      .then((response) => setAccount(response))
      .catch((err) => console.log(err));
  };
  userExist();

  return (
    <div>
      {user ? (
        <div>
          {account ? (
            <div>
              {account?.balances?.map(
                (
                  {
                    balance,
                    asset_code,
                    selling_liabilities,
                    buying_liabilities,
                  },
                  index
                ) => (
                  <div key={index} className={classes.balanceAccount}>
                    <Divider className={classes.divider} /> <br/>
                    <div>Asset: {!asset_code ? "XLM" : asset_code} </div>
                    <br />
                    <br />
                    <div>Balance: {parseFloat(balance).toFixed(2)} </div>
                    <div> Mount of selling offers: {parseFloat(selling_liabilities).toFixed(2)}</div>
                    <div> Mount of buying offers: {parseFloat(buying_liabilities).toFixed(2)}</div> <br/>
                  </div>
                )
              )}
            </div>
          ) : (
            <HashLoader color={"#ffd523"} size={30} />
          )}
        </div>
      ) : (
        <div>
          " Debes crear una wallet para ver tu balance"
          {/* <CreateAccount /> */}
        </div>
      )}
    </div>
  );
}
