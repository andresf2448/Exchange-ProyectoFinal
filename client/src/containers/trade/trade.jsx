import { useState, useEffect, useCallback } from "react";
import {
  Grid,
  /* , Card, Typography, CardContent */
} from "@material-ui/core";
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
      .limit(7)
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
      <Grid item xs={12} sm={4} md={3} style={{ marginBottom: "3%" }}>
        <Orderbook assets={assets} />
      </Grid>
      <Grid container item sm={8} md={6}>
        <Grid
          item
          xs={12}
          style={{
            height: "45vh",
            marginLeft: "5%",
            marginRight: "5%",
            marginBottom: "3%",
          }}
        >
          <TradingView />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "3%" }}
        >
          <ManageBuyOffer
            publicKey={publicKey}
            secretKey={secretKey}
            setUpdateOffers={setUpdateOffers}
            assets={assets}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={3}>
        <Grid
          item
          xs={12}
          sm={4}
          md={12}
          style={{marginBottom: "3%"}}
        >
          <OffersByAccount offers={offers} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={12}

          style={{marginBottom: "3%"}}
        >
          <CryptoCalculator />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Trade;
