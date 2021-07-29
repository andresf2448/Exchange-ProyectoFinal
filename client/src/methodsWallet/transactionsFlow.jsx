import { useState } from "react";
import { useDispatch } from "react-redux";
import { getClientSecret } from "redux/actions/actions";
import { supabase } from "supabase/supabase";
import CheckoutForm from "../components/stripe/checkoutForm";
import { Card, Container, FormControl, Button, TextField } from "@material-ui/core";
import useStyles from 'styles';


export default function TransactionsPopup() {
  const dispatch = useDispatch();
  // const currency = useSelector(state => state.asset)
  const [intentionBuy, setIntentionBuy] = useState();
  const [transactionType, setTransactionType] = useState();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    amount: "",
  });

  const classes = useStyles();
  
  const [kyc, setKyc] = useState(false);

  const aux = window.location.hash;

  const id = aux.slice(1,37);
  
  let currency 
  let crypto
  
  if (aux.slice(37).length > 3) {
     currency = aux.slice(37, 40)
    crypto = aux.slice(40)
  } else {
    currency = aux.slice(37)
  }
  

  const info = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id);
   
    if (error) return alert(error);
    if (data[0]) {
      
      return setTransactionType(data[0].kind);
    }
  };
  info();

  async function handleSubmit(event) {
    event.preventDefault();
    await supabase
      .from("transactions")
      .update([
        {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          kyc_verified: true,
        },
      ])
      .eq("id", id);

    setKyc(true);
  }

  async function handleSubmitTransaction(event) {
    event.preventDefault();
    const amount_out = input.amount - input.amount * 0.05;
    const amount_fee = input.amount * 0.05;
    await supabase
      .from("transactions")
      .update([
        {
          amount_fee: amount_fee,
          amount_out: amount_out,
          amount_in: input.amount,
        },
      ])
      .eq("id", id);
    
    setIntentionBuy(true);
    dispatch(
      getClientSecret({ currency: currency, amount: input.amount })
    );
  }
  
  return (
    <Container style={{ height:'100vh'}}>
      <Card elevation={3} className={classes.transactionCardContainer}> 
      {!kyc && (
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField 
            margin='dense'
              type="text"
              placeholder="firts name"
              name="firtsName"
              onChange={(event) =>
                setInput({ ...input, [event.target.name]: event.target.value })
              }
            />
            <TextField
            margin='dense'
              type="text"
              placeholder="last name"
              name="lastName"
              onChange={(event) =>
                setInput({ ...input, [event.target.name]: event.target.value })
              }
            />
            <TextField
              margin='dense'
              type="email"
              placeholder="email"
              name="email"
              onChange={(event) =>
                setInput({ ...input, [event.target.name]: event.target.value })
              }
            />

            <Button className={classes.yellowButton} value="Send">
              Send
            </Button>
          </FormControl>
        </form>
      )}
      {kyc && (
        <form onSubmit={handleSubmitTransaction}>
         
          <input
            type="text"
            placeholder="amount"
            name="amount"
            onChange={(event) =>
              setInput({ ...input, [event.target.name]: event.target.value })
            }
          />
          <input type="submit" value="Send" />
        </form>
      )}

      <div>
        {transactionType === "deposit" && kyc && intentionBuy ? (
          <div>
            <CheckoutForm amount={input.amount} currency={currency + 'R'} crypto={crypto} />
          </div>
        ) : null}
        {transactionType === "withdraw" && kyc && intentionBuy && (
          <div>
            <div>A que cuenta desea retirar sus fondos?</div>
            <input type="text" />
          </div>
        )}
      </div>
      </Card>
    </Container>
  );
}
