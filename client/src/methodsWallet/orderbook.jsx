import { useState, useEffect } from "react";
import StellarSdk from "stellar-sdk";
import Offer from "./offer.jsx";
import { supabase } from "../supabase/supabase";

export default function Orderbook({assets}) {
  const [assetBuy, setAssetBuy] = useState(StellarSdk.Asset.native());
  const [assetSell, setAssetSell] = useState(StellarSdk.Asset.native());
  const [response, setResponse] = useState();

  var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

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

  var callback = function (resp) {
    console.log("respaklsjdflasdkjf",resp)
    return setResponse(resp);
  };

  useEffect(() => {
    var es = server
      .orderbook(
        assetSell.issuer === undefined ? StellarSdk.Asset.native() : assetSell,
        assetBuy.issuer === undefined ? StellarSdk.Asset.native() : assetBuy
      )
      .cursor("now")
      .stream({ onmessage: callback });
  }, [assetSell, assetBuy]);

  return (
    <>
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
      </select>{" "}
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
      </select>{" "}
      {response && <Offer asks={response.asks} bids={response.bids} />}
    </>
  );
}
