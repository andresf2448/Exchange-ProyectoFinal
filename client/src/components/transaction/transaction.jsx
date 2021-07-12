import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "supabase/supabase";
import { takeSecretKey, takePublicKey, validate } from "./transactioTools";
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
} from "@material-ui/core";

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
  });
  const session = supabase.auth.session();
  const history = useHistory();
  const submit = false;
  const [transfer, setTransfer] = useState(false);

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
    let PublicKey = await takePublicKey(input.email);
    if (PublicKey) return PublicKey;
    return undefined;
  };

  const handleTransaction = async (event) => {
    event.preventDefault();
    let receiverPublicKey = await handleMail();

    if (receiverPublicKey) {
      let sourceSecretKey = await takeSecretKey();
      let succes = await axios.post("http://localhost:3001/transaction", {
        sourceSecretKey: sourceSecretKey,
        receiverPublicKey: receiverPublicKey,
        amount: input.amount,
      });
      alert("Succes !");
      console.log(succes.data);
      setSuccesTransaction(true);
      setTransaction(succes.data);
      setInput({
        email: "",
        amount: "",
      });
      setTransfer(true);
    } else {
      alert("Mail is not registered");
    }
  };

  const handleNewTransaction = () => window.location.reload();

  return (
    <Container>
      {session ? (
        <div>
          <br />
          <Typography variant="h4">Transaction</Typography>
          <Typography variant="h5">Search by email the person you want to transfer</Typography>
          <br />
          <form onSubmit={handleTransaction}>
            <FormControl>
              <TextField
                label={error.email === "" ? "Email" : error.email}
                name="email"
                type="text"
                value={input.email}
                onChange={handleChange}
                color={error.email === "" ? "primary" : "secondary"}
              />
              <TextField
                label={error.amount === "" ? "Amount" : error.amount}
                name="amount"
                type="text"
                value={input.amount}
                onChange={handleChange}
                disabled={error.email === "" ? submit : !submit}
                color={error.email === "" ? "primary" : "secondary"}
              />
            </FormControl>{" "}
            <br /> <br />
            <Button
              type="submit"
              variant="contained"
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
          </form>
        </div>
      ) : (
        history.push("/")
      )}
      {succesTransaction ? (
        <div>
          <Typography variant="h6">
            To see the detail of your transaction go to the follow link:
          </Typography>
          <a href={transaction} rel="noreferrer" target="_blank">
            Transaction Info
          </a>
          <br />
        </div>
      ) : null}
    </Container>
  );
}
