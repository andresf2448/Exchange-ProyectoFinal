import React from "react";
import { useHistory } from "react-router";
import { supabase } from "../../supabase/supabase";
import StellarSdk from "stellar-sdk";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {DataGrid} from '@material-ui/data-grid';


export const CardUser = () => {
  const [account, setAccount] = useState();
  const [offers, setOffers] = useState();
  const [transactions, setTransactions] = useState();
  const [validatePublicKey, setValidatePublicKey] = useState(false);
  const [validateOffers, setValidateOffers] = useState(false);
  const [validateTransactions, setValidateTransactions] = useState(false);
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
        .eq("account_id", 'GAJ22WDPA3IOIJPOXBWPWAXU3MVVTHNXZJZ3DSGXZSK4LYKLKTJGJY33');

        if(transactionsData.data.length !== 0){
          let data = transactionsData.data.map(x => {return {id: x.id,kind: x.kind, amount_in: x.amount_in, amount_out: x.amount_out, amount_fee: x.amount_fee, asset_code: x.asset_code, date_operation: x.date_operation}});
          setTransactions(data)
          setValidateTransactions(true);
        }
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

      if(ofertas.records.length !== 0){
        let data = ofertas.records.map(x => {return {id: x.id, amount: x.amount, asset_code: x.buying.asset_code, price: x.price}})
        setOffers(data);
        setValidateOffers(true);
      }
      
      setValidatePublicKey(true);
    }
  };

  const columnsOffer = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'asset_code', headerName: 'Asset Code', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
  ];

  const columnsTransactions = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'kind', headerName: 'Kind', width: 150 },
    { field: 'amount_in', headerName: 'Amount_In', width: 150 },
    { field: 'amount_out', headerName: 'Amount_Out', width: 170 },
    { field: 'amount_fee', headerName: 'Amount_Fee', width: 170 },
    { field: 'asset_code', headerName: 'Asset Code', width: 150 },
    { field: 'date_operation', headerName: 'Date_Operation', width: 200 },
  ];

  useEffect(() => {
    getBalance();
    getTransaction();
    getOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {account && validatePublicKey ? (
        <div>
          <h1>Balance</h1>
          <div>Asset: {!account.asset_code ? "XLM" : account.asset_code} </div>
          <div>Balance: {account.balance} </div>
          <div> Monto en ofertas de venta: {account.selling_liabilities}</div>
          <div> Monto en ofertas de compra: {account.buying_liabilities}</div> <br /><br /><br />
        </div>
      ) : (
        <div>Usuario no tiene Wallet</div>
      )}
      {validateOffers ? (
        <>
          <h1>Offers</h1>
          <div style={{ height: 380, width: '43%' }}>
          <DataGrid rows={offers} columns={columnsOffer} pageSize={5} />
          </div> <br /><br /><br />
        </>
        ) : null}
        {validateTransactions ? (
        <>
          <h1>Transactions</h1>
          <div style={{ height: 330, width: '81%' }}>
          <DataGrid rows={transactions} columns={columnsTransactions} pageSize={5} />
          </div>
        </>
        ) : null}

      <button onClick={() => history.push("/home")}>volver</button>
    </div>
  );
};
