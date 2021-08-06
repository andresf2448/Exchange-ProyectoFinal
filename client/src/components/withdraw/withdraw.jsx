import {
  Container,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import useStyles from "styles";
import { useState, useEffect } from "react";
import validateCbu from "arg.js";
import axios from "axios";
import { supabase } from "supabase/supabase";
import validate from "./withdrawTool";
import Swal from "sweetalert2";
import HashLoader from "react-spinners/HashLoader";
import { useSelector, useDispatch } from "react-redux";
import { getFullBalance, getBalance } from "redux/actions/actions";

export const Withdraw = () => {
  const session = supabase.auth.session();
  const [cbu, setCbu] = useState(false);
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    currency: "",
    amount: "",
    cbu: "",
  });
  const [error, setError] = useState({
    isError: true,
    email: "",
    amount: "",
  });
  const [waiting, setWaiting] = useState(false);
  let assetsFiat = useSelector((state) => state.assetsFiat);
  let account = useSelector((state) => state.account);

  const classes = useStyles();

  const handleChange = (event) => {
    setInput((input) => {
      return {
        ...input,
        [event.target.name]: event.target.value,
      };
    });
    setError(
      validate(
        {
          ...input,
          [event.target.name]: event.target.value,
        },
        assetsFiat
      )
    );

    if (event.target.name === "cbu") {
      setCbu(() => validateCbu.cbu.isValid(event.target.value));
    }
  };

  const handleSubmit = async () => {
    setWaiting(true);
    let succes = await axios.post("http://localhost:3001/payment", {
      sourceId: session.user.id,
      receiverId: "rocket",
      amount: input.amount,
      currency: input.currency,
    });

    dispatch(getBalance())
    dispatch(getFullBalance())

    Swal.fire({
      title: "Success!",
      html: `Your transfer <br> ${succes.data.amount} ${succes.data.currency} <br> Fee percentage <br> ${succes.data.feePercentage}% <br> Fee Amount <br> ${succes.data.fee} ${succes.data.currency} `,
      icon: "success",
      confirmButtonText: "Cool",
      background: "#1f1f1f",
      confirmButtonColor: "rgb(158, 158, 158)",
    });

    if (succes.data) {
      setWaiting(false);
      setInput({
        currency: "",
        amount: "",
        cbu: "",
      });
      setError({
        isError: true,
        email: "",
        amount: "",
      });
    }
  };

  useEffect(() => {
    dispatch(getBalance())
    dispatch(getFullBalance())
  }, [dispatch])

  return (
    <div>
      {account && assetsFiat.length > 0 ? (
        <Container align="center" style={{ height: "38vh" }}>
          {assetsFiat ? (
            <FormControl>
              <Typography variant="h4">Select options to withdraw</Typography>
              {!waiting ? (
                <>
                  <Select
                    fullWidth={true}
                    name="currency"
                    value={input.currency}
                    onChange={handleChange}
                  >
                    {assetsFiat
                      ? assetsFiat.map((element) => (
                          <MenuItem value={element.asset_code}>
                            {element.asset_code}
                          </MenuItem>
                        ))
                      : null}
                  </Select>

                  <TextField
                    name="amount"
                    margin="dense"
                    type="text"
                    label={error.amount === "" ? "Amount" : error.amount}
                    color={error.amount === "" ? "primary" : "secondary"}
                    disabled={!input.currency}
                    onChange={handleChange}
                    value={input.amount}
                    placeholder="Amount"
                  />
                  <TextField
                    margin="dense"
                    name="cbu"
                    type="text"
                    disabled={error.amount || !input.currency || !input.amount}
                    onChange={handleChange}
                    value={input.cbu}
                    placeholder="CBU account"
                  />
                  <div align="center">
                    <Button
                      type="submit"
                      className={classes.depositYellowButton}
                      disabled={!cbu || !input.currency || error.amount}
                      onClick={handleSubmit}
                    >
                      Withdraw
                    </Button>
                  </div>
                </>
              ) : (
                <div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <HashLoader color={"#ffd523"} size={40} />
                </div>
              )}
            </FormControl>
          ) : (
            <div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <HashLoader color={"#ffd523"} size={40} />
            </div>
          )}
        </Container>
      ) : (
        <div align="center">
          <Typography variant="h4">
            You have to create an account and trust in a token
          </Typography>
          <Typography variant="h4">(EURR, USDR or ARS) to withdraw</Typography>
        </div>
      )}
    </div>
  );
};
