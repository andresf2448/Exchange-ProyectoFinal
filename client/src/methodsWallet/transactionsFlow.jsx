import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientSecret } from "redux/actions/actions";
import { supabase } from "supabase/supabase";
import CheckoutForm from "../components/stripe/checkoutForm";
import { Button, TextField, Select, MenuItem, Grid, Typography, Container } from '@material-ui/core';

export default function TransactionsPopup() {
  const dispatch = useDispatch();
  const currency = useSelector(state => state.asset)
  const [intentionBuy, setIntentionBuy] = useState();
  const [transactionType, setTransactionType] = useState();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currency: "",
    amount: "",
  });
  const [error, setError] = useState();
  const [transaction, setTransaction] = useState(false); 
  const [kyc, setKyc] = useState(false);

  const aux = window.location.hash;

  const id = aux.slice(1);

  const info = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id);
   
    if (error) return setError(true);
    if (data[0]) {
      
      return setTransactionType(data[0].kind);
    }
  };
  info();

  /* const getPublicKey = async () => {
    const { data, error } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", id);

    if (error) return error;
    return data;
  }; */

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

  // const handleChange = (event) => {
  //   setInput({
  //     ...input,
  //     currency: event.target.value
  //   })
  // }
  
  const createTransaction = async (event) => {
    event.preventDefault()
    let transactionBack = await axios.post('http://localhost:3001/transactions/deposit/interactive', {
      asset_code: 'usdc',
      account: id,
      
    })
     setTransaction(transactionBack.data)
  }
  

  
  return (
    <div>
      <button onClick={createTransaction}>Create Transaction</button>
      {/* {transaction ? <h4 > {transaction.url} </h4> : null} */}
      {transaction ? <a href={transaction.url} > Link </a> : null}
      <div> Hola </div>

      {!kyc && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="firts name"
            name="firtsName"
            onChange={(event) =>
              setInput({ ...input, [event.target.name]: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="last name"
            name="lastName"
            onChange={(event) =>
              setInput({ ...input, [event.target.name]: event.target.value })
            }
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(event) =>
              setInput({ ...input, [event.target.name]: event.target.value })
            }
          />

          <input type="submit" value="Send" />
        </form>
      )}
      {kyc && (
        <form onSubmit={handleSubmitTransaction}>
          {/* <input
            type="text"
            placeholder="currency"
            name="currency"
            onChange={(event) =>
              setInput({ ...input, [event.target.name]: event.target.value })
            }
          /> */}
          {/* <Select value={input.currency} onChange={handleChange} >
            <MenuItem value='ARS'>ARS</MenuItem>
            <MenuItem value='EUR'>EUR</MenuItem>
            <MenuItem value='USD'>USD</MenuItem>
          </Select> */}
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
            <CheckoutForm amount={input.amount} currency={input.currency + 'R'} />
          </div>
        ) : null}
        {transactionType === "withdraw" && kyc && intentionBuy && (
          <div>
            <div>A que cuenta desea retirar sus fondos?</div>
            <input type="text" />
          </div>
        )}
      </div>
    </div>
  );
}
