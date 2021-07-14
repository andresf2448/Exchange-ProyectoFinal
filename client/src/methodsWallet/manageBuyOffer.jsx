import { useState } from "react";
import StellarSdk from "stellar-sdk";

export default function ManageBuyOffer() {
  const [assetAsk, setAssetAsk] = useState();
  const [assetBid, setAssetBid] = useState();
  /* const [assets, setAssets] = useState(); */
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const assets = [
    {
      code: "POAT",
      issuer: "GAECL2FYQAMR2YFVCMOBBAIOOZGEAER6HART2MW7JWGNRDN53Q3S2WOB",
    },
    {
      code: "XLM",
      issuer: undefined,
    },
  ]

  let ask = undefined;
  if (assetAsk && ask === undefined && assetAsk.code !== "XLM") {
    console.log("en if de assetAsk", assetAsk);
    const { code, issuer } = assetAsk;
    ask = new StellarSdk.Asset(code, issuer);
  } else ask = StellarSdk.Asset.native();

  let bid = undefined;

  if (assetBid && bid === undefined && assetBid.code !== "XLM") {
    console.log("antes de return", assetBid);
    const { code, issuer } = assetBid;
    bid = new StellarSdk.Asset(code, issuer);
  } else bid = StellarSdk.Asset.native();

  async function makeBuyOffer() {
    try {
      const publicKey =
        "GAJ22WDPA3IOIJPOXBWPWAXU3MVVTHNXZJZ3DSGXZSK4LYKLKTJGJY33";
      const secretKey =
        "SCNREEOCEUQBUXK773H2WEFMADCMH4BROZTWUPHMC4ITVOSJS3HIBDZM";
      const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);

      const [
        {
          max_fee: { mode: fee },
        },
        account,
      ] = await Promise.all([server.feeStats(), server.loadAccount(publicKey)]);
      console.log("aca anda3");
      console.log(account);
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
      const txResult = await server.submitTransaction(transaction);

      console.log(txResult);
    } catch (e) {
      console.error("Oh no! Something went wrong.");
      console.error(e);
    }
  }

  const selectAssetAsk = (event) => {
    const asset = assets.filter(
      (element) =>
        element.code === event.target.value && element.code !== assetBid
    );
    return setAssetAsk(asset[0]);
  };

  const selectAssetBid = (event) => {
    const asset = assets.filter(
      (element) =>
        element.code === event.target.value && element.code !== assetAsk
    );
    return setAssetBid(asset[0]);
  };

  function handleSubmit(event) {
    event.preventDefault();
    makeBuyOffer();
  }

  return (
    <div>
      <div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <select
            defaultValue=""
            name="assetAsk"
            onChange={(event) => selectAssetAsk(event)}
          >
            <option>Select a Asset</option>
            {assets.map((element) => {
              return <option key={element.code}>{element.code}</option>;
            })}
          </select>
          <select
            defaultValue=""
            name="assetBid"
            onChange={(event) => selectAssetBid(event)}
          >
            <option>Select a Asset</option>
            {assets.map((element) => {
              return (
                <option
                  onChange={(event) => selectAssetBid(event)}
                  key={element.code}
                >
                  {element.code}
                </option>
              );
            })}
          </select>
          <input type="submit"></input>
          <input type="text" name="amount" id="" onChange={(event)=> setAmount(event.target.value)} placeholder='Monto a vender' />
          <input type="text" name="price" id="" onChange={(event)=> setPrice(event.target.value)} placeholder='Precio por cada token a vender' />
        </form>
      </div>
    </div>
  );
}
