import {
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  Card,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import StellarSdk from "stellar-sdk";
import useStyles from "styles";
import Swal from "sweetalert2";

import { supabase } from "supabase/supabase";

export default function ManageBuyOffer({
  secretKey,
  assets,
  setUpdateOffers,
  publicKey,
}) {
  const [assetAsk, setAssetAsk] = useState();
  const [assetBid, setAssetBid] = useState();
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [account, setAccount] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const [hasProfileValidate, setHasProfileValidate] = useState(true);

  const classes = useStyles();

  const session = supabase.auth.session();

  const updateTransactions = async () => {
    await makeBuyOffer();
    return setUpdateOffers(true);
  };

  let hasProfile = async () => {
    await supabase;

    let { data } = await supabase
      .from("RegisteredUsers")
      .select(`hasProfileUserAnchor`)
      .eq("id_user", session.user.id);

    if (!data[0].hasProfileUserAnchor) {
      Swal.fire({
        text: "PLEASE COMPLET YOUR PROFILE IN SETTINGS",
        icon: "error",
        confirmButtonText: "Okay!",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });

      setHasProfileValidate(false);
    }

    console.log(data);
  };

  useEffect(() => {
    hasProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let ask = undefined;
  if (assetAsk && ask === undefined && assetAsk.asset_code !== "XLM") {
    const { asset_code, asset_issuer } = assetAsk;
    ask = new StellarSdk.Asset(asset_code, asset_issuer);
  } else ask = StellarSdk.Asset.native();

  let bid = undefined;

  if (assetBid && bid === undefined && assetBid.asset_code !== "XLM") {
    const { asset_code, asset_issuer } = assetBid;
    bid = new StellarSdk.Asset(asset_code, asset_issuer);
  } else bid = StellarSdk.Asset.native();

  useEffect(() => {
    server
      .loadAccount("GDWIGFKMGORBKFW7IZOKBZ4OBXXKITSOLJFTBRKFJOBKLQCGCZJ54IFE")
      .then((res) => setAccount(res))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  async function makeBuyOffer() {
    const verifyBalance = account?.balances?.filter(
      (balance) => balance.asset_code === ask.asset_code
    );

    setTimeout(() => {
      if (!verifyBalance || !account) {
        Swal.fire({
          text: "Please, try again!",
          icon: "error",
          confirmButtonText: "Okay!",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        });
      }
    }, 2000);
    console.log("verifyAccount", verifyBalance);
    console.log(price, publicKey, amount, secretKey, account);

    if (account) {
      if (verifyBalance.length === 0) {
        Swal.fire({
          text: "This asset is not available",
          icon: "error",
          confirmButtonText: "Okay!",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        });
      }
      if (Number(verifyBalance[0].balance) < Number(amount)) {
        Swal.fire({
          text: "This account doesn't have enough founds for this offer",
          icon: "error",
          confirmButtonText: "Okay!",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        });
      }
    }

    try {
      const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
      
      const [
        {
          max_fee: { mode: fee },
        },
        accounts,
      ] = await Promise.all([server.feeStats(), server.loadAccount(publicKey)]);
      
      const transaction = new StellarSdk.TransactionBuilder(accounts, {
        fee,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })

        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: bid,
            limit: "10000",
          })
        )
        .addOperation(
          StellarSdk.Operation.manageBuyOffer({
            selling: ask,
            buying: bid,
            buyAmount: amount,
            price: price,
          })
        )
        .setTimeout(0)
        .build();

      transaction.sign(sourceKeypair);
      server.submitTransaction(transaction).then((response)=> console.log(response))
      
    } catch (e) {
      Swal.fire({
        text: "Oh no! Something went wrong.",
        icon: "error",
        confirmButtonText: "Okay!",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }
  }

  const selectAssetAsk = (event) => {
    const asset = assets.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetBid
    );
    return setAssetAsk(asset[0]);
  };

  const selectAssetBid = (event) => {
    const asset = assets.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetAsk
    );
    return setAssetBid(asset[0]);
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateTransactions();
  }

  return (
    <Card className={classes.cardSaleOffer}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              style={{
                textAlign: "center",
                marginBottom: "2vh",
              }}
            >
              Create your sale offer:
            </Typography>
            <hr style={{color:"#ffd523", marginBottom:'2vh'}} />
          </Grid>
          <Grid item xs={4} style={{marginBottom:'2vh'}} align='center'>
            <Select
              variant="standard"
              value={assetAsk}
              onChange={(event) => selectAssetAsk(event)}
            >
              <MenuItem disabled value={1}>
                Buy asset
              </MenuItem>
              {assets &&
                assets.map((element) => {
                  return (
                    <MenuItem
                      value={element.asset_code}
                      key={element.asset_code}
                    >
                      {element.asset_code}
                    </MenuItem>
                  );
                })}
            </Select>
          </Grid>
          <Grid item xs={8} align='center'>
            <TextField
              variant="standard"
              value={amount}
              type="text"
              name="amount"
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Amount to sell"
              inputProps={{style:{textAlign:'center'}}}
            />
          </Grid>
          <Grid item xs={4} style={{marginBottom:'2vh'}} align='center'>
            <Select
              value={assetBid}
              variant="standard"
              onChange={(event) => selectAssetBid(event)}
            >
              <MenuItem disabled value={1}>
                Bid asset
              </MenuItem>
              {assets &&
                assets.map((element) => {
                  return (
                    <MenuItem
                      value={element.asset_code}
                      key={element.asset_code}
                    >
                      {element.asset_code}
                    </MenuItem>
                  );
                })}
            </Select>
          </Grid>
          <Grid item xs={8} align='center'>
            <TextField
              variant="standard"
              value={price}
              type="text"
              name="price"
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Price per token"
              inputProps={{style:{textAlign:'center'}}}

            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={4} style={{marginLeft:'1vw'}}>
            {hasProfileValidate ? (
              <Button type="submit" className={classes.invitedYellowButton}>
                Submit
              </Button>
            ) : (
              <Button
                type="submit"
                className={classes.invitedYellowButton}
                disabled
              >
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
