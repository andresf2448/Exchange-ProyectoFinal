import { Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import StellarSdk from "stellar-sdk";
import { supabase } from "../supabase/supabase";

export default function ManageBuyOffer({ publicKey, secretKey }) {
  const [assetAsk, setAssetAsk] = useState();
  const [assetBid, setAssetBid] = useState();
  const [assets, setAssets] = useState();
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();

  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const getAssets = async () => {
    let assets = await supabase.from("assets").select("*");
    return setAssets(assets);
  };
  if (!assets) getAssets();

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
      /* const publicKey =
        "GAJ22WDPA3IOIJPOXBWPWAXU3MVVTHNXZJZ3DSGXZSK4LYKLKTJGJY33";
      const secretKey =
        "SCNREEOCEUQBUXK773H2WEFMADCMH4BROZTWUPHMC4ITVOSJS3HIBDZM"; */
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
        .setTimeout(0)
        .build();

      transaction.sign(sourceKeypair);

      await server.submitTransaction(transaction);
    } catch (e) {
      console.error("Oh no! Something went wrong.");
      console.error(e);
    }
  }

  const selectAssetAsk = (event) => {
    const asset = assets.data.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetBid
    );
    return setAssetAsk(asset[0]);
  };

  const selectAssetBid = (event) => {
    const asset = assets.data.filter(
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
    <Grid container>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Grid container item alignContent="space-around">
          <Grid item xs={12}>
            <Typography>Create your sale offer:</Typography>
          </Grid>
          <Grid item xs={12}>
            <select
              defaultValue=""
              name="assetAsk"
              onChange={(event) => selectAssetAsk(event)}
            >
              <option>Select an ask Asset</option>
              {assets &&
                assets.data.map((element) => {
                  return (
                    <option key={element.asset_code}>
                      {element.asset_code}
                    </option>
                  );
                })}
            </select>
          </Grid>
          <Grid item xs={12}>
            <input
              type="text"
              name="amount"
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Amount to sell"
            />
          </Grid>
          <Grid item xs={12}>
            <select
              defaultValue=""
              name="assetBid"
              onChange={(event) => selectAssetBid(event)}
            >
              <option>Select a bid Asset</option>
              {assets &&
                assets.data.map((element) => {
                  return (
                    <option
                      onChange={(event) => selectAssetBid(event)}
                      key={element.asset_code}
                    >
                      {element.asset_code}
                    </option>
                  );
                })}
            </select>
          </Grid>
          <Grid item xs={12}>
            <input
              type="text"
              name="price"
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Price per token"
            />
          </Grid>
          <Grid item xs={12}>
            <input type="submit"></input>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
