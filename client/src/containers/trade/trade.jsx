import { useState, useEffect, useCallback } from "react";
import { Container, Grid /*  Card */ } from "@material-ui/core";
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
  //--------------------------------------Logic offersByAccount
  const [updateOffers, setUpdateOffers] = useState(true);
  const [offers, setOffers] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

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
    
    <Container maxWidth="lg">
    <Grid container>
      <Grid container item display="column" justifyContent={true}>
        <Grid item xs={12} sm={3} style={{ height: "700px" }}>
        
        </Grid>
        
        </Grid>
      </Grid>
    </Container>
  );
}
export default Trade;