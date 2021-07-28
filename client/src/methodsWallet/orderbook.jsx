import { useState } from "react";
import StellarSdk from "stellar-sdk";
import Offer from "./offer.jsx";
import { supabase } from "../supabase/supabase";


export default function Orderbook() {
  const [assetBuy, setAssetBuy] = useState(new StellarSdk.Asset("COUPON", "GBMMZMK2DC4FFP4CAI6KCVNCQ7WLO5A7DQU7EC7WGHRDQBZB763X4OQI"));
  const [assetSell, setAssetSell] = useState(new StellarSdk.Asset.native());
  const [response, setResponse] = useState();
  const [assets, setAssets] = useState();

  var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const getAssets = async () => {
    let assets = await supabase.from("assets").select("*");

    
    return setAssets(assets.data);
  };
  if (!assets) {
    getAssets();
  }
  const selectAssetBuy = (event) => {
    const aux = assets.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetSell
    );
    const asset = new StellarSdk.Asset(aux[0].asset_code, aux[0].asset_issuer);
    return setAssetBuy(asset);
  };
  const selectAssetSell = (event) => {
    const aux = assets.filter(
      (element) =>
        element.asset_code === event.target.value &&
        element.asset_code !== assetBuy
    );
    
      
    const asset = new StellarSdk.Asset(aux[0].asset_code, aux[0].asset_issuer);
    return setAssetSell(asset);
  };

  var callback = function (resp) {
    return setResponse(resp);
  };
  
  var es = server
    .orderbook(
      assetBuy,
      assetSell
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