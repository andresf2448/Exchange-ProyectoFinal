export default function Offer({ asks, bids }) {
  return (
    <div>
      <div>
        {asks.map((ask) => (
          <div> {ask.price} </div>
        ))}
      </div>
      <div>
        {bids.map((bid) => (
          <div> {bid.price} </div>
        ))}
      </div>
    </div>
  );
}
