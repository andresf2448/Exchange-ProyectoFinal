import { useState } from "react";
import StellarSdk from "stellar-sdk";
import axios from "axios";

export default function ManageBuyOffer() {
  const [asset, setAsset] = useState();
  const [assets, setAssets] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  /* console.log('------------')
  const response = axios.get('https://horizon-testnet.stellar.org/offers?buying=native')
  console.log(response.data)
console.log('------------') */
  /* const a = new StellarSdk.OfferCallBuilder('https://horizon-testnet.stellar.org') */
  /* const astroDollar = new StellarSdk.Asset(
    "AstroDollar",
    "GDA2EHKPDEWZTAL6B66FO77HMOZL3RHZTIJO7KJJK5RQYSDUXEYMPJYY"
  );

  const publicKey = "GAJ22WDPA3IOIJPOXBWPWAXU3MVVTHNXZJZ3DSGXZSK4LYKLKTJGJY33";
  const secretKey = "SCNREEOCEUQBUXK773H2WEFMADCMH4BROZTWUPHMC4ITVOSJS3HIBDZM"; */

  /* var callback = function (resp) {
  console.log(resp); */
  /* var es = server
  .offers()
  .selling(
    new StellarSdk.Asset(
      "USD",
      "GDUKMGUGDZQK6YHYA5Z6AY2G4XDSZPSZ3SW5UN3ARVMO6QSRDWP5YLEX",
    ),
  )
  .cursor("now")
  .stream({ onmessage: callback }); */

  async function makeBuyOffer() {
    try {
      console.log("aca anda1");
      // Fetch the base fee and the account that will create our transaction
      const publicKey =
        "GAJ22WDPA3IOIJPOXBWPWAXU3MVVTHNXZJZ3DSGXZSK4LYKLKTJGJY33";
      const secretKey =
        "SCNREEOCEUQBUXK773H2WEFMADCMH4BROZTWUPHMC4ITVOSJS3HIBDZM"
      const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
      const USDC = new StellarSdk.Asset(
        "USDC",
        "GC5W3BH2MQRQK2H4A6LP3SXDSAAY2W2W64OWKKVNQIAOVWSAHFDEUSDC"
      );
      console.log("aca anda2");
      const [
        {
          max_fee: { mode: fee },
        },
        account,
      ] = await Promise.all([server.feeStats(), server.loadAccount(publicKey)]);
      console.log("aca anda3");
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          // Our account needs to explicitly trust the asset before we can
          // make an offer
          StellarSdk.Operation.changeTrust({
            asset: USDC,
            limit: "1000",
          })
        )

        // The `manageBuyOffer` operation creates (or alters) a buy offer.
        .addOperation(
          StellarSdk.Operation.manageBuyOffer({
            selling: StellarSdk.Asset.native(),
            buying: USDC,
            buyAmount: "100",
            price: "1",
          })
        )
        .setTimeout(10000000)
        .build();
        console.log("aca anda6")
        transaction.sign(sourceKeypair);
        console.log(transaction)
      console.log("aca anda7");
      console.log(server)
      const txResult = await server.submitTransaction(transaction);
      /* recoupLumens(accountKeypair.secret()); */
      console.log(txResult);
      return `Success! ${publicKey} offered to buy 100 XLM for 1 AstroDollars each`;
    } catch (e) {
      console.error("Oh no! Something went wrong.");
      console.error(e);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    makeBuyOffer();
  }

  return (
    <div>
      <div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <select
            name="asset"
            onChange={(event) => setAsset(event.target.value)}
          >
            {" "}
            Assets{" "}
          </select>
          <option defaultValue="" selected>
            Select a Asset
          </option>
          {/* {assets._embedded.records.map((element) => {
              return <option key={element.asset_code}>{element.asset_code}</option>;
            })} */}
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
}
