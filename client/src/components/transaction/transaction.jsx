import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "supabase/supabase";
import { takereceiverId, takeSourceId, validate } from "./transactioTools";
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  ButtonGroup,
  Select,
  MenuItem
} from "@material-ui/core";
import useStyles from 'styles';

export default function Transaction() {
  const [error, setError] = useState({
    isError: true,
    email: "",
    amount: "",
  });
  const [transaction, setTransaction] = useState("");
  
  const [succesTransaction, setSuccesTransaction] = useState(false);
  const [input, setInput] = useState({
    email: "",
    amount: "",
    currency: ""
  });
  const session = supabase.auth.session();
  const history = useHistory();
  const submit = false;
  const [transfer, setTransfer] = useState(false);

  const classes = useStyles();

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setError(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleMail = async () => {
    let receiverId = await takereceiverId(input.email);
    if (receiverId) return receiverId;
    return undefined;
  };

  const handleTransaction = async (event) => {
    event.preventDefault();


    let {data} = await supabase
    .from('UserAnchor')
    .select('firstName, lastName')
    .eq('id_user', session.user.id)

    if (data.length < 1) {
      return alert('You need to complete your profile to do a transaction')
    }
    let receiverId = await handleMail();



    if (receiverId) {
      let info = await supabase
        .from("RegisteredUsers")
        .select("bannedUser")
        .eq("email", input.email);

      if (info.data[0].bannedUser) {
        alert("User is banned");
      } else {
        let sourceId = await takeSourceId();
        let succes = await axios.post("http://localhost:3001/payment", {
          sourceId: sourceId,
          receiverId: receiverId,
          amount: input.amount,
          currency: input.currency
        });
        alert("Succes !");
        setSuccesTransaction(true);
        setTransaction(succes.data);
        setInput({
          email: "",
          amount: "",
          currency: ""
        });
        setTransfer(true);
      }
    } else {
      alert("Mail is not registered");
    }
  };
  
  

  const handleNewTransaction = () => window.location.reload();
  
  return (
    <>
    <Container className={classes.cardCheck}>
      
      {session ? (
        <div>
          <Typography variant="h4">Transaction</Typography>
          <Typography variant="h5">
            Search by email the person you want to transfer
          </Typography>
          <br />
          <form onSubmit={handleTransaction}>
            <FormControl className={classes.formCheck}>
              <TextField
                label={error.email === "" ? "Email" : error.email}
                name="email"
                type="text"
                value={input.email}
                onChange={handleChange}
                color={error.email === "" ? "primary" : "secondary"}
                fullWidth={true}
              /> <br/>
              <Select fullWidth={true} name='currency' value={input.currency} onChange={handleChange} >
                <MenuItem value='ARSR'>ARSR</MenuItem>
                <MenuItem value='EURR'>EURR</MenuItem>
                <MenuItem value='HenryCoin'>HenryCoin</MenuItem>
                <MenuItem value='SRT'>SRT</MenuItem>
                <MenuItem value='USDR'>USDR</MenuItem>
                <MenuItem value='XLM'>XLM</MenuItem>
                
              </Select>

              <TextField
                label={error.amount === "" ? "Amount" : error.amount}
                name="amount"
                type="text"
                value={input.amount}
                onChange={handleChange}
                disabled={error.email === "" ? submit : !submit}
                color={error.email === "" ? "primary" : "secondary"}
                fullWidth={true}
              />
            </FormControl>{" "}
            <br /> <br />
            <ButtonGroup className={classes.formCheck}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={error.isError || transfer ? !submit : submit}
                >
                Transfer
              </Button>{" "}
              <br />
              <Button
                onClick={handleNewTransaction}
                variant="contained"
                color="primary"
                disabled={succesTransaction ? submit : !submit}
                >
                New Transaction
              </Button>
            </ButtonGroup>
          </form>
          
        </div> 
      ) :  (
        history.push("/")
      )}
      
      </Container>
      
      <Container>
      {succesTransaction && transaction ? (
        <div>
          <br/>
          <Typography variant="h2">
            Detail of your transaction 
          </Typography>
          <h3>Your payment</h3>
          <h4>{transaction.amount} {transaction.currency.toUpperCase()}</h4>
          <h3>Fee percentage</h3>
          <h4>{transaction.feePercentage}%</h4>
          <h3>Fee Amount</h3>
          <h4>{transaction.fee} {transaction.currency.toUpperCase()}</h4>
          <br />
        </div>
      ) : null}
      </Container>
    </>
  );
}
