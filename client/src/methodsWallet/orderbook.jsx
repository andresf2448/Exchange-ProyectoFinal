import { useState } from "react";
import StellarSdk from "stellar-sdk";
import Offer from "./offer.jsx";

export default function Orderbook({ assets }) {
  const [assetBuy, setAssetBuy] = useState();
  const [assetSell, setAssetSell] = useState();
  const [response, setResponse] = useState();

  var server = new StellarSdk.Server("https://horizon.stellar.org");

  const selectAssetBuy = (event) => {
    const aux = assets.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetSell
    );
    if (aux[0].asset_code === "XLM") return setAssetSell(false);
    const asset = new StellarSdk.Asset(aux[0].asset_code, aux[0].asset_issuer);
    return setAssetBuy(asset[0]);
  };
  const selectAssetSell = (event) => {
    const aux = assets.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetBuy
    );
    if (aux[0].asset_code === "XLM")
      return setAssetSell(false);
    const asset = new StellarSdk.Asset(aux[0].asset_code, aux[0].asset_issuer);
    return setAssetSell(asset[0]);
  };

  var callback = function (resp) {
    return setResponse(resp);
  };

  server
    .orderbook(
      !assetBuy ? new StellarSdk.Asset.native() : assetBuy,
      !assetSell ? new StellarSdk.Asset.native() : assetSell
    )
    .cursor("now")
    .stream({ onmessage: callback });
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
              <option
                onChange={(event) => selectAssetBuy(event)}
                key={element.asset_code}
              >
                {element.asset_code}
              </option>
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
              <option
                onChange={(event) => selectAssetSell(event)}
                key={element.asset_code}
              >
                {element.asset_code}
              </option>
            );
          })}
      </select>{" "}
      {response && <Offer asks={response.asks} bids={response.bids} />}
    </>
  );
}
