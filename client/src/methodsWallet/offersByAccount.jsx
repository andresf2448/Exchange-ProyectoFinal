import { useState, useEffect } from "react";
import StellarSdk from "stellar-sdk";

export default function OffersByAccount({ publicKey }) {
  const [offers, setOffers] = useState();

  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  useEffect(() => {
    if (!offers && publicKey) getOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offers]);

  async function getOffers() {
    const ofertas = await server
      .offers()
      .forAccount(publicKey)
      .order("desc")
      .limit(10)
      .call();
    setOffers(ofertas);
  }

  
  return (
    <>
      {offers &&
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
