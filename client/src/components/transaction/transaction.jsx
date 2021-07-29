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
  MenuItem,
  Divider,
} from "@material-ui/core";
import useStyles from 'styles';
import Swal from 'sweetalert2';
import HashLoader from "react-spinners/HashLoader";

export default function Transaction() {
  const [error, setError] = useState({
    isError: true,
    email: "",
    amount: "",
  });
  const [transaction, setTransaction] = useState("");
  const [waiting, setWaiting] = useState(false);
  
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

  const handleChange = async (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
     setError(
      await validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
    if (event.target.name === 'amount') {
      setTransfer(false)
    }
  };

  const handleMail = async () => {
    let receiverId = await takereceiverId(input.email);
    if (receiverId) return receiverId;
    return undefined;
  };

  const handleTransaction = async (event) => {
    event.preventDefault();

    setWaiting(true)

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
        Swal.fire({
          title: 'Hold it!',
          text: "User is banned",
          icon: 'warning',
          confirmButtonText: 'Cool',
          background: '#1f1f1f',
          confirmButtonColor:'rgb(158, 158, 158)',
        });
      } else {
        let sourceId = await takeSourceId();
        try {
          let succes = await axios.post("http://localhost:3001/payment", {
            sourceId: sourceId,
            receiverId: receiverId,
            amount: input.amount,
            currency: input.currency
          });
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            confirmButtonText: 'Cool',
            background: '#1f1f1f',
            confirmButtonColor:'rgb(158, 158, 158)',
          });
          
          setSuccesTransaction(true);
          setTransaction(succes.data);
          setInput({
            email: "",
            amount: "",
            currency: ""
          });
          setTransfer(true);
          setWaiting(false)
          
        } catch (error) {
          console.log('Error', error)
        }
      }
    } else {
      Swal.fire({
        title: 'Uops!',
        text: "Mail is not registered",
        icon: 'error',
        confirmButtonText: 'Ok',
        background: '#1f1f1f',
        confirmButtonColor:'rgb(158, 158, 158)',
      });
    }
  };
  
  const handleNewTransaction = () => {
    setSuccesTransaction(false)
    setTransaction('');
    setInput({
      email: "",
      amount: "",
      currency: ""
    });
    setTransfer(true);
  }
  
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
          <Divider className={classes.divider}/>
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
              <Select disabled={!input.email || error.email} fullWidth={true} name='currency' value={input.currency} onChange={handleChange} >
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
                disabled={input.currency ? submit : !submit}
                color={error.email === "" ? "primary" : "secondary"}
                fullWidth={true}
              />
            </FormControl>{" "}
            <br /> <br />
            <ButtonGroup className={classes.formCheck}>
              <Button
                type="submit"
                variant="outlined"
                className={classes.yellowButton}
                style={{width: '60%', color: '#ffd523'}}
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
        {waiting ? <div align='center'><HashLoader color={'#ffd523'} size={50}/></div> : null}
      {succesTransaction && transaction ? (
        <div align='center'>
          <br/>
          <Typography variant="h3">
            Detail of your transaction 
          </Typography>
          <Typography variant="h5">Your transfer</Typography>
          <Typography variant="h6">{transaction.amount} {transaction.currency.toUpperCase()}</Typography>
          <Typography variant="h5">Fee percentage</Typography>
          <Typography variant="h6">{transaction.feePercentage}%</Typography>
          <Typography variant="h5">Fee Amount</Typography>
          <Typography variant="h6">{transaction.fee} {transaction.currency.toUpperCase()}</Typography>
          <br />
        </div>
      ) : null}
      </Container>
    </>
  );
}
