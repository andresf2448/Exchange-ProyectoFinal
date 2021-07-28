import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "supabase/supabase";
import { Button } from "@material-ui/core";
import "./stripeCard.css";
import Swal from 'sweetalert2';

import CardForm from "./stripeCard";
import { deleteClientSecret } from "redux/actions/actions";
import { useRef } from "react";
import axios from "axios";

export default function CheckoutForm({amount, currency, crypto}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const clientSecret = useSelector((state) => state.client_secret);

  const [payment, setPayment] = useState(false);
  const [error, setError] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [paymentCrypto, setPaymentCrypto] = useState();

  const session = supabase.auth.session();

  const inputEl = useRef(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setWaiting(() => true);
    setError(() => false);
    
    if (!stripe || !elements) return;

    if (clientSecret) {
      const { data, error } = await supabase
        .from("UserAnchor")
        .select("firstName, lastName")
        .eq("id_user", session.user.id);

      if (error) return Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool',
        background: '#1f1f1f',
        confirmButtonColor:'rgb(158, 158, 158)',
      });

      if (data.length > 0) {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: data[0]?.firstName + ' ' + data[0]?.lastName || "No data",
            },
        }});
        setWaiting(false);
        if (result.error) {
          setError(result.error.message);
        } else if (result.paymentIntent.status === "succeeded") {
          setPayment(result.paymentIntent);
          
          let paymentRocket = await axios.post('http://localhost:3001/payment', {
            sourceId: 'rocket', 
            receiverId: session.user.id, 
            amount: amount,
            currency: currency,
            crypto: crypto
          })
          
          setPaymentCrypto(paymentRocket.data)
        }

      }
      }
  }
  

  const backHome = () => {
    dispatch(deleteClientSecret());
    history.push("/home");
  };

  useEffect(() => {
    return () => dispatch(deleteClientSecret());
  }, [dispatch]);

  const handleConfirm = () => {
    inputEl.current.click();
  };
  console.log('Que onda stripe???')
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
      {payment && paymentCrypto ? (
        <div>
          <h1>Succes Payment</h1>
          <h3>Your payment</h3>
          <h4>{payment.amount / 100} {payment.currency.toUpperCase()}</h4>
          <h3>You received</h3>
          <h4>{paymentCrypto.amount} {crypto ? crypto : payment.currency.toUpperCase() + 'R'}</h4>
          <h3>Percentage of the fee was</h3>
          <h4>{paymentCrypto.feePercentage}%</h4>
          <h3>The total fee was</h3>
          <h4>{paymentCrypto.fee} {payment.currency.toUpperCase()}</h4>
          
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
