import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "supabase/supabase";
import { Button } from "@material-ui/core";
import "./stripeCard.css";

import CardForm from "./stripeCard";
import { deleteClientSecret } from "redux/actions/actions";
import { useRef } from "react";
import axios from "axios";

export default function CheckoutForm({amount, currency}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const clientSecret = useSelector((state) => state.client_secret);

  const [payment, setPayment] = useState(false);
  const [error, setError] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const session = supabase.auth.session();

  const inputEl = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaiting(() => true);
    setError(() => false);

    if (!stripe || !elements) return;

    if (clientSecret) {
      const { data, error } = await supabase
        .from("datauser")
        .select("email")
        .eq("id_user", session.user.id);

      if (error) return alert(error.message);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: data[0]?.email || "Juan Perez",
          },
        },
      });
      setWaiting(false);
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setPayment(result.paymentIntent);
        console.log('PaymentIntenttttt', clientSecret)
        axios.post('http://localhost:3001/payment', {
          sourceId: 1, 
          receiverId: session.user.id, 
          amount: amount,
          asset: currency
        })
      }
    }
  };

  const backHome = () => {
    dispatch(deleteClientSecret());
    history.push("/home");
  };

  useEffect(() => {
    return () => dispatch(deleteClientSecret());
  }, [dispatch]);

  // if(clientSecret === null) {
  //   history.push("/")
  // }
  // else if(clientSecret === undefined) {
  //   return <h1>Loading...</h1>
  // }

  const handleConfirm = () => {
    inputEl.current.click();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardForm />
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          disabled={payment}
        >
          Confirm order
        </Button>
        <input
          ref={inputEl}
          type="submit"
          id="confirm-stripe"
          name="confirm-stripe"
          disabled={!stripe}
        />
      </form>
      {waiting ? <h3>Loading...</h3> : null}
      {payment ? (
        <div>
          <h1>Succes !!</h1>
          <h3>
            Your payment of {payment.amount / 100}{" "}
            {payment.currency.toUpperCase()} was successful!
          </h3>
          <Button color="primary" variant="contained" onClick={backHome}>
            Back Home
          </Button>
        </div>
      ) : error === "Your card has insufficient funds." ? (
        <>
          <h1>{error}</h1>
          <h2>Try again with other card</h2>
          <h2>Or</h2>
          <Button color="primary" variant="contained" onClick={backHome}>
            Back Home
          </Button>
        </>
      ) : error ? (
        <h1>{error}</h1>
      ) : null}
    </>
  );
}
