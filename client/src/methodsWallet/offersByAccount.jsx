import { useState, useEffect } from "react";
import StellarSdk from "stellar-sdk";
import { supabase } from "../supabase/supabase";

export default function OffersByAccount() {
  const [offers, setOffers] = useState();
  const [publicKey, setPublicKey] = useState();

  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const getPublicKey = async () => {
    const session = supabase.auth.session();

    const { data: public_key } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);
    return setPublicKey(public_key[0].public_key);
  };
  if (!publicKey) {
    getPublicKey();
  }

  useEffect(() => {
    if (!offers && publicKey){
      getOffers();
    } 
  }, [offers, publicKey]);

  async function getOffers() {
    
    server
      .offers()
      .forAccount(publicKey)
      .call()
      .then(function (offers) {

      setOffers(offers)        
      });
  }
  
  return (
    <>
      {offers?.records?.length > 1 &&
        offers.records.map((offer) => (
          <div key={offer.id}>
            {" "}
            Monto: {offer.amount}, Asset: {offer.buying?.asset_code} Price:{" "}
            {offer.price}{" "}
          </div>
        ))}
    </>
  );
}
