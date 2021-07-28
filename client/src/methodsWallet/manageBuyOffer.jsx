import {
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import StellarSdk from "stellar-sdk";
import { supabase } from "../supabase/supabase";
import useStyles from "styles";

export default function ManageBuyOffer() {
  const [assetAsk, setAssetAsk] = useState();
  const [assetBid, setAssetBid] = useState();
  const [assets, setAssets] = useState();
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [publicKey, setPublicKey] = useState();
  const [secretKey, setSecretKey] = useState();

  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  console.log("publickey es esta",publicKey)
  console.log("esta es la secret key",secretKey)
  const getAssets = async () => {
    const session = supabase.auth.session();
    let assets = await supabase.from("assets").select("*");

    const { data: public_key } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);
    setPublicKey(public_key[0].public_key)
    const { data: secret_key } = await supabase
      .from("wallet")
      .select("secret_key")
      .eq("id_user", session.user.id);
    setSecretKey(secret_key[0].secret_key)
    return setAssets(assets.data);
  };
  if (!assets) {
    getAssets();
  }
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

  async function makeBuyOffer() {
    try {
      const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);

      const [
        {
          max_fee: { mode: fee },
        },
        account,
      ] = await Promise.all([server.feeStats(), server.loadAccount(publicKey)]);

      const transaction = new StellarSdk.TransactionBuilder(account, {
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
        .setTimeout(10000000)
        .build();

      transaction.sign(sourceKeypair);
          console.log(transaction)
      const tx = await server.submitTransaction(transaction);
      console.log(tx);
    } catch (e) {
      console.error("Oh no! Something went wrong.");
      console.error(e);
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
    makeBuyOffer();
  }

  return (
    <Grid
      container
      style={{
        backgroundColor: "#1F1F1F",
        marginLeft: "-19px",
        paddingLeft: "20px",
        marginTop: "-22px",
      }}
    >
      <form onSubmit={(event) => handleSubmit(event)}>
        <Grid container item alignContent="space-around">
          <Grid item xs={12}>
            <Typography>Create your sale offer:</Typography>
          </Grid>
          <Grid item style={{ display: "flex" }}>
            <Grid item xs={12}>
              <Select
                value={assetAsk}
                style={{
                  marginTop: "2px",
                  padding: "5px",
                  borderRadius: "3px",
                  backgroundColor: "white",
                  color: "rgb(183, 189, 198)",
                }}
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
            <Grid item xs={12}>
              <input
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "white",
                  color: "rgb(183, 189, 198)",
                }}
                value={amount}
                type="text"
                name="amount"
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Amount to sell"
              />
            </Grid>
          </Grid>
          <Grid item style={{ display: "flex", marginTop: "5px" }}>
            <Grid item xs={12}>
              <Select
                value={assetBid}
                style={{
                  marginTop: "1.5px",
                  paddingRight: "7.5px",
                  padding: "5px",
                  borderRadius: "3px",
                  backgroundColor: "white",
                  color: "rgb(183, 189, 198)",
                }}
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
            <Grid item xs={12}>
              <input
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "white",
                  color: "rgb(183, 189, 198)",
                }}
                valur={price}
                type="text"
                name="price"
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Price per token"
              />
            </Grid>
          </Grid>
          <Grid
            item
            style={{ display: "flex", justifyContent: "flex-end" }}
            xs={12}
          >
            <Button
              type="submit"
              style={{
                marginRight: "5px",
                marginTop: "4px",
                backgroundColor: "white",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
