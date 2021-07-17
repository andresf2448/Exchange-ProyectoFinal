import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "supabase/supabase";

import CardForm from "./stripeCard";
import { deleteClientSecret } from "redux/actions/actions";

export default function CheckoutForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const clientSecret = useSelector((state) => state.client_secret);
  
  const [payment, setPayment] = useState(false);
  const [error, setError] = useState(false);
  
  const session = supabase.auth.session()

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    if (clientSecret) {
      const {data, error} = await supabase
      .from('datauser')
      .select('email')
      .eq('id_user', session.user.id)

      if(error) return alert(error.message)
      console.log('dasdadasdasdada', data)

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Jenny Rosen",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setPayment(result.paymentIntent);
      }
    }
  };

  const backHome = () => {
    dispatch(deleteClientSecret())
    history.push("/home");
  };

  useEffect(() => {

    return () => dispatch(deleteClientSecret())
  }, [dispatch])
  
  if(clientSecret === null) {
    history.push("/")
  }
  else if(clientSecret === undefined) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      
      <form onSubmit={handleSubmit}>
        <CardForm />
        <button disabled={!stripe}>Confirm order</button>
      </form>
      {payment ? (
        <div>
          <h1>Succes !!</h1>
          <h3>
            Your payment of {payment.amount / 100}{" "}
            {payment.currency.toUpperCase()} was successful!
          </h3>
          <button onClick={backHome}>Back Home</button>
        </div>
      ) : error === 'Your card has insufficient funds.' ? (
        <>
        <h1>{error}</h1>
        <h2>Try again with other card</h2>
        <h2>Or</h2>
        <button onClick={backHome}>Back Home</button>
        </>
      ) : error ? 
      <h1>{error}</h1>
      : null
    }
    </>
  );
}
