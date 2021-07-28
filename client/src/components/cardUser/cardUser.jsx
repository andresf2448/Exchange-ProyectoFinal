import React from "react";
import { useHistory } from "react-router";
import { supabase } from "../../supabase/supabase";
import StellarSdk from "stellar-sdk";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Container, Card, Grid, Typography, Button, Divider } from "@material-ui/core";
import useStyles from "styles";
import HashLoader from "react-spinners/HashLoader";

export const CardUser = () => {
  const classes = useStyles();
  const [account, setAccount] = useState();
  const [offers, setOffers] = useState();
  const [transactions, setTransactions] = useState();
  const [validatePublicKey, setValidatePublicKey] = useState(false);
  const [validateOffers, setValidateOffers] = useState(false);
  const [validateTransactions, setValidateTransactions] = useState(false);
  const [email, setEmail] = useState('');
  const [spinner, setSpinner] = useState(true);
  const history = useHistory();
  const state = useSelector((state) => state.detailsId);

  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const getPublicKey = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key, email")
      .eq("id_user", state);
    
    setEmail(data[0].email)

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
        .eq(
          "account_id",
          "GAJ22WDPA3IOIJPOXBWPWAXU3MVVTHNXZJZ3DSGXZSK4LYKLKTJGJY33"
        );

      if (transactionsData.data.length !== 0) {
        let data = transactionsData.data.map((x) => {
          return {
            id: x.id,
            kind: x.kind,
            amount_in: x.amount_in,
            amount_out: x.amount_out,
            amount_fee: x.amount_fee,
            asset_code: x.asset_code,
            date_operation: x.date_operation,
          };
        });
        setTransactions(data);
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
        .forAccount("GAJ22WDPA3IOIJPOXBWPWAXU3MVVTHNXZJZ3DSGXZSK4LYKLKTJGJY33")
        .order("desc")
        .limit(10)
        .call();

      if (ofertas.records.length !== 0) {
        let data = ofertas.records.map((x) => {
          return {
            id: x.id,
            amount: x.amount,
            asset_code: x.buying.asset_code,
            price: x.price,
          };
        });
        setOffers(data);
        setValidateOffers(true);
      }

      setValidatePublicKey(true);
    }
  };

  const columnsOffer = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "asset_code", headerName: "Asset Code", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
  ];

  const columnsTransactions = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "kind", headerName: "Kind", width: 150 },
    { field: "amount_in", headerName: "Amount_In", width: 150 },
    { field: "amount_out", headerName: "Amount_Out", width: 170 },
    { field: "amount_fee", headerName: "Amount_Fee", width: 170 },
    { field: "asset_code", headerName: "Asset Code", width: 150 },
    { field: "date_operation", headerName: "Date_Operation", width: 200 },
  ];

  useEffect(() => {
    getBalance();
    getTransaction();
    getOffers();
    setTimeout(() => {
      setSpinner(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container disableGutters maxWidth='md' style={{minHeigth: '130vh', paddingTop: 20, paddingBottom: 20}}>
        {
          spinner ?
          <Card elevation={3} className={classes.cardUserSpinner}>
            <Grid style={{ height: '8vh' }}>
              <HashLoader color={'#ffd523'} size={70}/> 
            </Grid>
          </Card>
          :
          <Card elevation={3} className={classes.cardUserContainer}>
          <Grid container justifyContent="center" alignItems="center">
          {
            account && validatePublicKey ? (
              <Grid container>
                <Grid item xs={10} align="center" style={{marginBottom: 20}}>
                  <Typography variant="h3">User - {email}</Typography>
                </Grid>
                <Grid item xs={2}  align="center" style={{marginBottom: 20}}>
                  {/* <Button className={classes.yellowButton} onClick={() => history.push("/home")}>Back</Button> */}
                </Grid>
                <Grid item xs={12}  align="center" style={{marginBottom: 20}}>
                  <Divider variant='middle' className={classes.divider}/>
                  <Typography variant="h4">BALANCE</Typography>
                  <Typography variant="body1" >
                    Asset: {!account.asset_code ? "XLM" : account.asset_code}
                  </Typography>
                  <Typography variant="body1">
                    Balance: {account.balance} 
                  </Typography>
                  <Typography variant="body1">
                    Monto en ofertas de venta: {account.selling_liabilities}
                  </Typography>
                  <Typography variant="body1">
                    Monto en ofertas de compra: {account.buying_liabilities}
                  </Typography>{" "}
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <Grid item xs={10} align="center">
                  <Typography variant="h3">User: {email} no tiene Wallet</Typography>
                </Grid>
                <Grid item xs={2}  align="center" style={{marginBottom: 20}}>
                  <Button variant="contained" color="primary" onClick={() => history.push("/home")}>Back</Button>
                </Grid>
              </Grid>
            )}
            {validateOffers ? (
              <Grid item xs={12}  align="center" style={{marginBottom: 20}}>
                <Typography variant="h4">OFFERS</Typography>
                <div style={{ height: 380, width: "70%" }}>
                  <DataGrid style={{color: 'whitesmoke'}} rows={offers} columns={columnsOffer} pageSize={5} />
                </div>
                {/* <br />
                <br />
                <br /> */}
              </Grid>
            ) : null}
            {validateTransactions ? (
              <Grid item xs={12}  align="center" style={{marginBottom: 20}}>
                <Typography variant="h4">TRANSACTIONS</Typography>
                <div style={{ height: 330, width: "100%" }}>
                  <DataGrid
                    style={{color: 'whitesmoke'}}
                    rows={transactions}
                    columns={columnsTransactions}
                    pageSize={5}
                  />
                </div>
              </Grid>
            ) : null }
          </Grid>
          </Card>
        }
    </Container>
  );
};
