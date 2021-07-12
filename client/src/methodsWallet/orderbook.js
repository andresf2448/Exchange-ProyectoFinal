import { useState } from "react";
import StellarSdk from "stellar-sdk";
import Offer from "./Offer.js";

export default function Orderbook() {
  const [response, setResponse] = useState();

  var server = new StellarSdk.Server("https://horizon.stellar.org");

  var callback = function (resp) {
    return setResponse(resp);
  };

  const es = server
    .orderbook(
      new StellarSdk.Asset.native(),
      new StellarSdk.Asset(
        "BB1",
        "GD5J6HLF5666X4AZLTFTXLY46J5SW7EXRKBLEYPJP33S33MXZGV6CWFN"
      )
    )
    .cursor("now")
    .stream({ onmessage: callback });
  console.log(response);
  return <>{response && <Offer asks={response.asks} bids={response.bids} />}</>;
}
