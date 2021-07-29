export default function OffersByAccount({ offers }) {
  
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
