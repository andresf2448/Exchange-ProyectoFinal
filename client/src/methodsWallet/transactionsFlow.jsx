import { useState } from "react";
import { useDispatch } from "react-redux";
import { getClientSecret } from "redux/actions/actions";
import { supabase } from "supabase/supabase";
import CheckoutForm from "../components/stripe/checkoutForm";
import { FormControl, TextField, Button, Typography } from "@material-ui/core";
import useStyles from "styles";
import Swal from "sweetalert2";

export default function TransactionsPopup() {
  const dispatch = useDispatch();
  const [intentionBuy, setIntentionBuy] = useState();
  const [transactionType, setTransactionType] = useState();
  const [input, setInput] = useState();
  const [publicKey, setPublicKey] = useState(false);

  const session = supabase.auth.session();

  const aux = window.location.hash;

  const id = aux.slice(1, 37);

  const classes = useStyles();

  let currency;
  let crypto;

  if (aux.slice(37).length > 3) {
    currency = aux.slice(37, 40);
    crypto = aux.slice(40);
  } else {
    currency = aux.slice(37);
  }

  const info = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id);

    if (error)
      return Swal.fire({
        title: "Uops!",
        text: error,
        icon: "error",
        confirmButtonText: "Ok",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    if (data[0]) {
      return setTransactionType(data[0].kind);
    }
  };
  info();

  async function handleSubmitTransaction(event) {
    event.preventDefault();
    let { data: names } = await supabase
      .from("UserAnchor")
      .select("firstName, lastName")
      .eq("id_user", session.user.id);

    let { data: email } = await supabase
      .from("datauser")
      .select("email")
      .eq("id_user", session.user.id);

    await supabase
      .from("transactions")
      .update([
        {
          firstName: names[0]?.firstName || "No data",
          lastName: names[0]?.lastName || "No data",
          email: email[0]?.email || "No data",
          kyc_verified: true,
        },
      ])
      .eq("id", id);

    if (
      currency.toUpperCase() === "XLM" ||
      currency.toUpperCase() === "SRT" ||
      currency.toUpperCase() === "HENRY COIN"
    ) {
      let { data: publicKey } = await supabase
        .from("rocketWallet")
        .select("stellarPublicKey");

      setPublicKey(publicKey[0].stellarPublicKey);
      setIntentionBuy(true);
    } else {
      dispatch(getClientSecret({ currency: currency, amount: input }));
      setIntentionBuy(true);
    }
  }

  const closeTab = () => {
    // history.push("/home");
    window.open("about:blank", "_self");
    window.close();
  };

  return (
    <div align="center">
      <div style={{ paddingTop: "40px" }}>
        <form onSubmit={handleSubmitTransaction}>
          <FormControl>
            <TextField
              type="text"
              placeholder="Amount"
              name="amount"
              onChange={(event) => setInput(event.target.value)}
            />
            <Button
              className={classes.yellowButtonFlow}
              onClick={(event) => handleSubmitTransaction(event)}
              disabled={!input}
            >
              Next
            </Button>
          </FormControl>
        </form>
      </div>
      {currency.toUpperCase() !== "XLM" &&
      currency.toUpperCase() !== "SRT" &&
      currency.toUpperCase() !== "HENRY COIN" ? (
        <div>
          {transactionType === "deposit" && intentionBuy ? (
            <div>
              <CheckoutForm
                amount={input}
                currency={currency + "R"}
                crypto={crypto}
                id={id}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          {transactionType === "deposit" && intentionBuy && publicKey ? (
            <div>
              <br />
              <Typography variant="h6">
                You should transfer {input} {crypto || currency} to:
              </Typography>{" "}
              <br />
              <Typography variant="h6">PublicKey {publicKey} </Typography>
              <Typography variant="h6">
                Then we will transfer our tokens to your account
              </Typography>
              <Button className={classes.yellowButton} onClick={closeTab}>
                Close Tab
              </Button>
            </div>
          ) : null}
        </div>
      )}
      <div>
        {transactionType === "withdraw" && intentionBuy && (
          <div>
            <div>A que cuenta desea retirar sus fondos?</div>
            <input type="text" />
          </div>
        )}
      </div>
    </div>
  );
}
