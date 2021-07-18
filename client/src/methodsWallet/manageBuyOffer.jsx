import { useState } from "react";
import StellarSdk from "stellar-sdk";
import { supabase } from "../supabase/supabase";

export default function ManageBuyOffer() {
  const [assetAsk, setAssetAsk] = useState();
  const [assetBid, setAssetBid] = useState();
  const [assets, setAssets] = useState();
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();

  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const getAssets = async () => {
    if (!assets) {
      let assets = await supabase.from("assets").select("*");

      return setAssets(assets);
    }
    return;
  };
  getAssets();

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
    <div> 
      <div>Este es el componente para crear ofertas de venta</div>
      <div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <select
            defaultValue=""
            name="assetAsk"
            onChange={(event) => selectAssetAsk(event)}
          >
            <option>Select a Asset</option>
            {assets &&
              assets.data.map((element) => {
                return (
                  <option key={element.asset_code}>{element.asset_code}</option>
                );
              })}
          </select>
          <select
            defaultValue=""
            name="assetBid"
            onChange={(event) => selectAssetBid(event)}
          >
            <option>Select a Asset</option>
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
          <input type="submit"></input>
          <input
            type="text"
            name="amount"
            id=""
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Monto a vender"
          />
          <input
            type="text"
            name="price"
            id=""
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Precio por cada token a vender"
          />
        </form>
      </div>
    </div>
  );
}
