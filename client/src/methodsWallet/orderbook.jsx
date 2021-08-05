import { useState, useEffect } from "react";
import StellarSdk from "stellar-sdk";
import Offer from "./offer.jsx";
import { Grid, Select, MenuItem, Card } from "@material-ui/core";
import HashLoader from "react-spinners/HashLoader";

export default function Orderbook({ assets }) {
  // const [ spinner, setSpinner] = useState(true)
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
      <Grid container style={{ width:"90%",marginRight: "5%", marginLeft: "5%" }}>
        <Grid item xs={6} align="center">
          <Select
            variant="outlined"
            defaultValue=""
            value={assetBuy.code}
            name="asset"
            onChange={(event) => selectAssetBuy(event)}
            style={{ height: "75%", width: "100%" }}
          >
            <MenuItem disabled value={1}>
              Buy Asset
            </MenuItem>
            {assets &&
              assets.map((element) => {
                return (
                  <MenuItem key={element.asset_code} value={element.asset_code}>
                    {element.asset_code}
                  </MenuItem>
                );
              })}
          </Select>
        </Grid>
        <Grid item xs={6} align="center">
          <Select
            variant="outlined"
            defaultValue=""
            value={assetSell.code}
            name="asset"
            onChange={(event) => selectAssetSell(event)}
            style={{ height: "75%", width: "100%" }}
          >
            <MenuItem value={1}>Sell Asset</MenuItem>
            {assets &&
              assets.map((element) => {
                return (
                  <MenuItem key={element.asset_code} value={element.asset_code}>
                    {element.asset_code}
                  </MenuItem>
                );
              })}
          </Select>
        </Grid>
        {!response ? (
          <Grid item xs={12}>
            <Card
              style={{
                // minWidth: "21vw",
                height: "35vh",
                paddingTop: "35vh",
              }}
            >
              <HashLoader
                color={"#ffd523"}
                css={{ marginLeft: "45%", marginTop: "40vh" }}
              />
            </Card>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Offer asks={response.asks} bids={response.bids} />
          </Grid>
        )}
      </Grid>
  );
}
