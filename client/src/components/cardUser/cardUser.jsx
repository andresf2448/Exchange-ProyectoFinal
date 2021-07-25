import React from "react";
import { useHistory } from "react-router";
import { supabase } from "../../supabase/supabase";
import StellarSdk from "stellar-sdk";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const CardUser = () => {
  const [account, setAccount] = useState();
  const [offers, setOffers] = useState();
  const [validatePublicKey, setValidatePublicKey] = useState(false);
  const history = useHistory();
  const state = useSelector((state) => state.detailsId);

  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const getPublicKey = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", state);

      return data;
  };

  const getBalance = async () => {

    let data = await getPublicKey();

    if (data.length > 0) {
      await server
        .loadAccount(data[0]?.public_key)
        .then((response) => {
          setAccount(response.balances[0]);
        })
        .catch((err) => console.log(err));
      setValidatePublicKey(true);
    }
  };

  const getTransaction = async () => {
    
    let data = await getPublicKey();

    if (data.length > 0) {
      let transactionsData = await supabase
        .from("transactions")
        .select("*")
        .eq("account_id", data[0]?.public_key);

      console.log(transactionsData);
      setValidatePublicKey(true);
    }
  };

  const getOffers = async () => {
    
    let data = await getPublicKey();

    if (data.length > 0) {
      const ofertas = await server
        .offers()
        .forAccount('GAJ22WDPA3IOIJPOXBWPWAXU3MVVTHNXZJZ3DSGXZSK4LYKLKTJGJY33')
        .order("desc")
        .limit(10)
        .call();

      console.log(ofertas.records);
      setValidatePublicKey(true);
    }
  };

  useEffect(() => {
    getBalance();
    getTransaction();
    getOffers();
  }, []);

  return (
    <div>
      {account && validatePublicKey ? (
        <div>
          <div>Asset: {!account.asset_code ? "XLM" : account.asset_code} </div>
          <div>Balance: {account.balance} </div>
          <div> Monto en ofertas de venta: {account.selling_liabilities}</div>
          <div> Monto en ofertas de compra: {account.buying_liabilities}</div>
        </div>
        /* {offers.length !== 0 ? (
          <label>Id: </label> <span></span>
        ) : null} */
      ) : (
        <div>Usuario no tiene Wallet</div>
      )}

      <button onClick={() => history.push("/home")}>volver</button>
    </div>
  );
};
