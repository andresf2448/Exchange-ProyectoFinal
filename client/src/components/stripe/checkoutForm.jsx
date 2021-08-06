import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { useSelector, useDispatch } from "react-redux";
import { supabase } from "supabase/supabase";
import { Button, Typography } from "@material-ui/core";
import "./stripeCard.css";
import Swal from "sweetalert2";

import CardForm from "./stripeCard";
import {
  deleteClientSecret,
  getBalance,
  getFullBalance,
} from "redux/actions/actions";
import { useRef } from "react";
import axios from "axios";

import useStyles from "styles";

export default function CheckoutForm({ amount, currency, crypto, id }) {
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

  const classes = useStyles();

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

      if (error)
        return Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Cool",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: data[0]?.firstName + " " + data[0]?.lastName || "No data",
          },
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setPayment(result.paymentIntent);

        let paymentRocket = await axios.post("http://localhost:3001/payment", {
          sourceId: "rocket",
          receiverId: session.user.id,
          amount: amount,
          currency: currency,
          crypto: crypto,
        });

        await supabase
          .from("transactions")
          .update([
            {
              amount_fee: paymentRocket.data.fee,
              amount_out: paymentRocket.data.amount,
              amount_in: amount,
            },
          ])
          .eq("id", id);

        setPaymentCrypto(paymentRocket.data);
        dispatch(getFullBalance());
        dispatch(getBalance());
        setWaiting(false);
      }
    }
  };

  const closeTab = () => {
    dispatch(deleteClientSecret());
    // history.push("/home");
    window.open("about:blank", "_self");
    window.close();
  };

  useEffect(() => {
    return () => dispatch(deleteClientSecret());
  }, [dispatch]);

  const handleConfirm = () => {
    inputEl.current.click();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardForm /> <br />
        <div align="center">
          <Button
            onClick={handleConfirm}
            className={classes.yellowButton}
            disabled={payment}
          >
            Confirm order
          </Button>
        </div>
        <input
          ref={inputEl}
          type="submit"
          id="confirm-stripe"
          name="confirm-stripe"
          disabled={!stripe}
        />
      </form>
      {waiting ? (
        <div align="center">
          {" "}
          <h3>Loading...</h3>{" "}
        </div>
      ) : null}
      {payment && paymentCrypto ? (
        <div align="center">
          <Typography variant="h3" style={{ color: "#8CBC4E" }}>
            Succes Payment
          </Typography>{" "}
          <br />
          <Typography variant="h5">Your payment</Typography>
          <Typography variant="h6">
            {payment.amount / 100} {payment.currency.toUpperCase()}
          </Typography>
          <br />
          <Typography variant="h5">You received</Typography>
          <Typography variant="h6">
            {paymentCrypto.amount}{" "}
            {crypto ? crypto : payment.currency.toUpperCase() + "R"}
          </Typography>
          <br />
          <Typography variant="h5">Percentage of the fee was</Typography>
          <Typography variant="h6">{paymentCrypto.feePercentage}%</Typography>
          <br />
          <Typography variant="h5">The total fee was</Typography>
          <Typography variant="h6">
            {paymentCrypto.fee} {payment.currency.toUpperCase()}
          </Typography>
          <br />
          <Button className={classes.yellowButton} onClick={closeTab}>
            Close Tab
          </Button>
        </div>
      ) : error === "Your card has insufficient funds." ? (
        <>
          <h1>{error}</h1>
          <h2>Try again with other card</h2>
          <h2>Or</h2>
          <Button color="secondary" onClick={closeTab}>
            Close Tab
          </Button>
        </>
      ) : error ? (
        <h1>{error}</h1>
      ) : null}
    </>
  );
}
