import React, { useState } from "react";
import StellarSdk from "stellar-sdk";
import { supabase } from "../supabase/supabase";

export default function BalanceAccount() {
  const [account, setAccount] = useState()
  
  const session = supabase.auth.session();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  
  const getBalance = async () => {
    if(!account) {
      let publicKey = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);
      console.log(publicKey)

    const cuenta = await server.loadAccount(publicKey?.data[0]?.public_key);
    return setAccount(cuenta)
  }
    return
  };
  getBalance();
  

  return (
    <div>
      {account &&
        account.balances.map(
          (
            { balance, asset_code, selling_liabilities, buying_liabilities },
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
  );
          
}
