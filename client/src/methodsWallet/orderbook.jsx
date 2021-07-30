import { useState, useEffect } from "react";
import StellarSdk from "stellar-sdk";
import Offer from "./offer.jsx";
import { Grid } from "@material-ui/core";

export default function Orderbook({ assets }) {
  const [assetBuy, setAssetBuy] = useState(
    new StellarSdk.Asset(
      "USDC",
      "GC5W3BH2MQRQK2H4A6LP3SXDSAAY2W2W64OWKKVNQIAOVWSAHFDEUSDC"
    )
  );
  const [assetSell, setAssetSell] = useState(StellarSdk.Asset.native());
  const [response, setResponse] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const selectAssetBuy = (event) => {
    const aux = assets.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetSell
    );
    if (event.target.value === "XLM") {
      return setAssetBuy(new StellarSdk.Asset.native());
    }
    const asset = new StellarSdk.Asset(aux[0].asset_code, aux[0].asset_issuer);
    return setAssetBuy(asset);
  };
  const selectAssetSell = (event) => {
    if (event.target.value === "XLM") {
      return setAssetSell(new StellarSdk.Asset.native());
    }
    const aux = assets.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetBuy
    );

    const asset = new StellarSdk.Asset(aux[0].asset_code, aux[0].asset_issuer);
    return setAssetSell(asset);
  };

  const callback = function (resp) {
    return setResponse(resp);
  };

  useEffect(() => {
    server
      .orderbook(
        assetSell.issuer === undefined ? StellarSdk.Asset.native() : assetSell,
        assetBuy.issuer === undefined ? StellarSdk.Asset.native() : assetBuy
      )
      .cursor("now")
      .stream({ onmessage: callback });
  }, [assetSell, assetBuy, server]);

  return (
    <Grid container>
      <Grid container style={{ marginRight:'30px'}}>
        <Grid item xs={2}></Grid>
      <Grid item xs={4}>
      <select
        defaultValue=""
        name="asset"
        onChange={(event) => selectAssetBuy(event)}
      >
        <option>Buy Asset</option>
        {assets &&
          assets.map((element) => {
            return (
              <option key={element.asset_code}>{element.asset_code}</option>
              );
            })}
      </select>
      </Grid>
      <Grid item xs={4}>
      <select
        defaultValue=""
        name="asset"
        onChange={(event) => selectAssetSell(event)}
      >
        <option>Sell Asset</option>
        {assets &&
          assets.map((element) => {
            return (
              <option key={element.asset_code}>{element.asset_code}</option>
            );
          })}
      </select>
      </Grid>
      </Grid>
      {response && <Offer asks={response.asks} bids={response.bids} />}
    </Grid>
  );
}
