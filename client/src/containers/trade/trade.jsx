import { useState, useEffect, useCallback } from "react";
import { Grid, Card, Typography, CardContent } from "@material-ui/core";
import { CryptoCalculator } from "components/cryptoCalculator/cryptoCalculator";
import ManageBuyOffer from "methodsWallet/manageBuyOffer";
import Orderbook from "methodsWallet/orderbook";
import TradingView from "components/tradingView/tradingView";
import OffersByAccount from "methodsWallet/offersByAccount";
import { supabase } from "../../supabase/supabase";
import StellarSdk from "stellar-sdk";

function Trade() {
  const [assets, setAssets] = useState();
  const [publicKey, setPublicKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const session = supabase.auth.session();

  async function getAssets() {
    const { data: assets } = await supabase.from("assets").select("*");
    return setAssets(assets);
  }
  if (!assets) getAssets();

  const keys = async () => {
    const { data: public_key } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);
    setPublicKey(public_key[0]?.public_key);

    const { data: secret_key } = await supabase
      .from("wallet")
      .select("secret_key")
      .eq("id_user", session.user.id);

    return setSecretKey(secret_key[0]?.secret_key);
  };
  if (!publicKey && !secretKey) {
    keys();
  }
  //---Logic offersByAccount
  const [updateOffers, setUpdateOffers] = useState(true);
  const [offers, setOffers] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOffers = useCallback(() => {
    server
      .offers()
      .forAccount(publicKey)
      .order("desc")
      .call()
      .then(function (offers) {
        setOffers(offers);
      });
  });

  useEffect(() => {
    if (updateOffers) {
      if (publicKey) {
        getOffers();
        setUpdateOffers(false);
      }
    }
  }, [publicKey, updateOffers, getOffers]);

  //--------------------------------------------------------

  return (
    <Grid container style={{ backgroundColor: "#1f1f1f" }}>
      {/* solo para quitar el warning */}
      {offers && null}
      <Grid container item display="column" justifyContent={true}>
        {/* <Grid item xs={12} sm={3} style={{ height: "700px" }}>
          <Orderbook assets={assets} />
        </Grid>
        <Grid container item xs={12} sm={6}>
          <Grid
            item
            xs={12}
            style={{
              height: "400px",
              paddingRight: "25px",
              paddingTop: "40px",
            }}
          >
            <TradingView />
          </Grid>

            <Grid item xs={12} sm={6} > */}
        {/* <Card elevation={3} className={classes.cardContainer} > */}

        {/* <ManageBuyOffer
                publicKey={publicKey}
                secretKey={secretKey}
              /> */}
        {/* </Card> */}
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={6}>
              <ManageBuyOffer />
            </Grid> */}

        {/* </Grid> */}
        {/* <Grid container item sm={3}>
          <Grid item xs={12} style={{ height: "300px", paddingTop: "40px" }}>
            <Card style={{ height: "300px", textAlign: "center" }}>
              Listado de ventas activas
            </Card>

            <OffersByAccount publicKey={publicKey} />
          </Grid>
          <Grid item xs={12}>
            <CryptoCalculator />
          </Grid>
        </Grid> */}
        {/* ////////*/}
        <Grid item xs={12} sm={3} style={{ marginTop: "2vh" }}>
          <Orderbook assets={assets} />
        </Grid>
        <Grid container item xs={12} sm={6}>
          <Grid
            item
            xs={12}
            style={{
              marginLeft: "1vw",
              marginRight: "1vw",
              height: "45vh",
              marginTop: "8vh",
            }}
          >
            <TradingView />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{ marginLeft: "13vw", marginTop: "4vh" }}
          >
            <ManageBuyOffer
              publicKey={publicKey}
              secretKey={secretKey}
              setUpdateOffers={setUpdateOffers}
              assets={assets}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
        <Grid container item sm={3}>
          <Grid item xs={12} style={{ marginTop: "8vh" }}>
              <OffersByAccount offers={offers} />
          </Grid>
          <Grid item xs={12} style={{ marginTop:"2vh", marginLeft: "2vw" }}>
            <CryptoCalculator />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Trade;
