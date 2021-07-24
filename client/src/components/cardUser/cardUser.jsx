import React from "react";
import { useHistory } from "react-router";
import { supabase } from "../../supabase/supabase";
import StellarSdk from "stellar-sdk";
import { useState, useEffect } from "react";

export const CardUser = () => {
  const [account, setAccount] = useState();
  const history = useHistory();

  const session = supabase.auth.session();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const getBalance = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    await server
      .loadAccount(data[0]?.public_key)
      .then((response) => {
        setAccount(response.balances[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      {account ? (
        <div>
          <div>Asset: {!account.asset_code ? "XLM" : account.asset_code} </div>
          <div>Balance: {account.balance} </div>
          <div> Monto en ofertas de venta: {account.selling_liabilities}</div>
          <div> Monto en ofertas de compra: {account.buying_liabilities}</div>
        </div>
      ) : null}

      <button onClick={() => history.push("/home")}>volver</button>
    </div>
  );
};
