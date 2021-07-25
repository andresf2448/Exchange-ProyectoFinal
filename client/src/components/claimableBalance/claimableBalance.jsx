import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Paper, Container, Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField } from '@material-ui/core';
import useStyles from 'styles';
import { supabase } from "supabase/supabase";


export default function ClaimableBalance() {
  // const [claimant, setClaimant] = useState('GDUHC3DP3YI2TU2HX7E575L5NTAOZJEBG7I7VPCJ2KLTLVJWHBLB4BSR') CUENTA DE TESTEO
  // const [claimant, setClaimant] = useState('GDUHC3DP3YI2TU2HX7E575L5NTAOZJEBG7I7VPCJ2KLTLVJWHBLB4BSR')  //CUENTA DE LAPI
  // const [claimant, setClaimant] = useState('GD6X2H6UW6QFCXTDVDFH7HA6NESJRBTVXBPC4ECABIIU4VSBFQI7N4EM')  //CUENTA DE JULI
  const session = supabase.auth.session();

  // const [claimBalance, setClaimBalance] = useState('initialState');
  // const [paymentOrder, setPaymentOrder] = useState('initialState');
  const [keys, setKeys] = useState({});
  const [info, setInfo] = useState('empty')
  const [idd, setIdd] = useState();

  const classes = useStyles()

  const getClaimableBalance = async () => {
    // var server = new StellarSdk.Server("https://horizon.stellar.org");

    let data = await axios.get(' https://horizon-testnet.stellar.org/accounts/GDUHC3DP3YI2TU2HX7E575L5NTAOZJEBG7I7VPCJ2KLTLVJWHBLB4BSR/operations')
    let inter = data.data._embedded.records.filter(element => { return element.type === "create_claimable_balance" })
    let claimant = inter.filter(element => { return element.sponsor !== keys.publicKey })
    let sponsor = inter.filter(element => { return element.sponsor === keys.publicKey })
    setInfo({ claimant, sponsor });
    console.log('Soy claimant en : ', info.claimant, 'Soy sponsor en: ', info.sponsor)

    // server
    //   // .claimableBalances()
    //   // .claimableBalanceId("2554938605445121")

    //   // .sponsor('GDUHC3DP3YI2TU2HX7E575L5NTAOZJEBG7I7VPCJ2KLTLVJWHBLB4BSR')
    //   .call()
    //   .then(function (resp) {
    //     console.log( resp, 'SECRETKEY: ', keys.secretKey);


    //   })
    //   .catch(function (err) {
    //     console.error(err);
    //   });
  }

  useEffect(() => {
    userExist();

  }, []);
  useEffect(() => {

    getClaimableBalance()

  }, [keys, setKeys])

  const userExist = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    if (data.length === 0) {
      alert('You dont have a wallet');
    }
    if (data.length > 0) {
      let secret = await supabase
        .from("wallet")
        .select("secret_key")
        .eq("id_user", session.user.id);
      setKeys({ publicKey: data[0].public_key, secretKey: secret.data[0].secret_key })
      // setClaimant(keys.publicKey);
      // setSponsor(keys.publicKey);


      // setSecretKeyUser(secret.data[0].secret_key);
      // setPublicKeyUser(data[0].public_key);
      // setHasWallet(true);
    }
  };
  var StellarSdk = require("stellar-sdk");



  const sdk = require("stellar-sdk");

  async function main() {
    let server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

    let A = StellarSdk.Keypair.fromSecret(keys.secretKey);
    let B = StellarSdk.Keypair.fromPublicKey("GD6X2H6UW6QFCXTDVDFH7HA6NESJRBTVXBPC4ECABIIU4VSBFQI7N4EM"); //public julian

    // NOTE: Proper error checks are omitted for brevity; always validate things!

    let aAccount = await server.loadAccount(A.publicKey()).catch(function (err) {
      console.error(`Failed to load ${A.publicKey()}: ${err}`)
    })
    if (!aAccount) { return }

    // Create a claimable balance with our two above-described conditions.
    let soon = Math.ceil((Date.now() / 1000) + 60); // .now() is in ms
    let bCanClaim = StellarSdk.Claimant.predicateBeforeRelativeTime("60");
    let aCanReclaim = StellarSdk.Claimant.predicateNot(
      StellarSdk.Claimant.predicateBeforeAbsoluteTime(soon.toString())
    );

    // Create the operation and submit it in a transaction.
    let claimableBalanceEntry = StellarSdk.Operation.createClaimableBalance({
      claimants: [
        new StellarSdk.Claimant(B.publicKey(), bCanClaim),
        new StellarSdk.Claimant(A.publicKey(), aCanReclaim)
      ],
      asset: StellarSdk.Asset.native(),
      amount: "1",
    });

    let tx = new StellarSdk.TransactionBuilder(aAccount, { fee: StellarSdk.BASE_FEE })
      .addOperation(claimableBalanceEntry)
      .setNetworkPassphrase(StellarSdk.Networks.TESTNET)
      .setTimeout(180)
      .build();

    tx.sign(A);
    let txResponse = await server.submitTransaction(tx).then(function (res) {
      console.log(res, "Claimable balance created!");
    }).catch(function (err) {
      console.error(`Tx submission failed: ${err}`)
    });
  }


  const claimBalance = async (event) => {
    event.preventDefault()
    let server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

    
    let balances = await server
      .claimableBalances()
      .claimant(keys.publicKey)
      .limit(1)       // there may be many in general
      .order("desc")  // so always get the latest one
      .call()
      .catch(function (err) {
        console.error(`Claimable balance retrieval failed: ${err}`)
      });
    if (!balances) { return; }

    let balanceId = balances.records[0].id
    setIdd([...idd, balanceId]);
    console.log("Balance ID (3):", balanceId);
    
    let codigo = idd.pop();
    

    let claimBalance = StellarSdk.Operation.claimClaimableBalance({ balanceId: codigo }); 
    console.log(keys.publicKey, "claiming", codigo); 

    let aAccount = await server.loadAccount(keys.publicKey).catch(function (err) {
      console.error(`Failed to load ${keys.publicKey}: ${err}`)
    })

    let tx = new StellarSdk.TransactionBuilder(aAccount, { fee: StellarSdk.BASE_FEE })
      .addOperation(claimBalance)
      .setNetworkPassphrase(StellarSdk.Networks.TESTNET)
      .setTimeout(180)
      .build();

    tx.sign(StellarSdk.Keypair.fromSecret(keys.secretKey));
    await server.submitTransaction(tx).catch(function (err) {
      console.error(`Tx submission failed: ${err}`)
    });

  }



  return (
    <Container width="100px">
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' >Claimable Balance</Typography>

          <TableContainer className={classes.tableScroll} component={Paper} >
            <Table stickyHeader size="small" >

              <TableHead >
                <TableRow>
                  <TableCell align="center" >ID</TableCell>
                  <TableCell align="center" >AMOUNT</TableCell>
                  <TableCell align="center" >SPONSOR</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {typeof info !== 'string' && info.claimant && info.claimant.length > 0 && info.claimant !== undefined ? info.claimant.map((element, i) => (
                  <TableRow key={i}>
                    <TableCell>{element.id}</TableCell>
                    <TableCell >${element.amount}</TableCell>
                    <TableCell>{element.sponsor}</TableCell>
                    <TableCell><Button onClick={(event) => claimBalance(event)}>Claim</Button></TableCell>
                  </TableRow>
                )) :
                  <TableRow><TableCell>There is no claimable balances yet</TableCell></TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Button onClick={main}>New Claimed Balance</Button>
      {/* <form  noValidate autoComplete="off">
                <TextField id="standard-basic" label="Standard" />
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </form> */}

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' >Payment Orders</Typography>

          <TableContainer className={classes.tableScroll} component={Paper} >
            <Table stickyHeader size="small" >

              <TableHead >
                <TableRow>
                  <TableCell align="center" >ID</TableCell>
                  <TableCell align="center" >AMOUNT</TableCell>
                  <TableCell align="center" >CLAIMANT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {typeof info.sponsor !== 'string' && info.sponsor && info.sponsor.length > 0 && info.sponsor !== undefined ? info.sponsor.map((element, i) => (
                  <TableRow key={i}>
                    <TableCell>{element.id}</TableCell>
                    <TableCell >${element.amount}</TableCell>
                    <TableCell>{element.claimants[0].destination}</TableCell>
                    <TableCell><Button onClick={(event) => claimBalance(event)}>Claim</Button></TableCell>
                  </TableRow>
                )) :
                  <TableRow><TableCell>There is no payments orders yet</TableCell></TableRow>

                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>


    </Container>)
}

// STREAM DE CLAIMABLEBALANCE
// var StellarSdk = require("stellar-sdk");
// var server = new StellarSdk.Server("https://horizon.stellar.org");

// server
//   .transactions()
//   .forClaimableBalance(
//     "00000000178826fbfe339e1f5c53417c6fedfe2c05e8bec14303143ec46b38981b09c3f9",
//   )
//   .call()
//   .then(function (resp) {
//     console.log(resp);
//   })
//   .catch(function (err) {
//     console.error(err);
//   });