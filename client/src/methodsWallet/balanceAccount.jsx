import React, { useState, useEffect } from "react";
import StellarSdk from "stellar-sdk";
import { supabase } from "../supabase/supabase";
import CreateAccount from "./createAccount";



export default function BalanceAccount() {
  const [account, setAccount] = useState(false);
  const [user, setUser] = useState(false);
 

  const session = supabase.auth.session();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const userExist = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    if (data.length === 0) setUser(false);
    if (data.length > 0) {
      getBalance();
      setUser(true);
    }
  };

  const getBalance = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    await server
      .loadAccount(data[0]?.public_key)
      .then((response) => setAccount(response))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userExist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

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
                  <div key={index}>
                    <div>Asset: {!asset_code ? "XLM" : asset_code} </div>
                    <div>Balance: {balance} </div>
                    <div> Monto en ofertas de venta: {selling_liabilities}</div>
                    <div> Monto en ofertas de compra: {buying_liabilities}</div>
                  </div>
                )
              )}
            </div>
          ) : (
            "loading"
          )}
        </div>
      ) : (
        <div>
          " Debes crear una wallet para ver tu balance"
          <CreateAccount />
        </div>
      )}
    </div>
  );
}