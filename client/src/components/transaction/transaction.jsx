import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "supabase/supabase";
import { takereceiverId, takeSourceId, validate } from "./transactioTools";
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import useStyles from "styles";
import Swal from "sweetalert2";
// import StellarSdk from "stellar-sdk";
import { useSelector, useDispatch } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { getFullBalance, getBalance } from "redux/actions/actions";

export default function Transaction() {
  const ourMediaQuery = useMediaQuery("(min-width:820px)");
  const dispatch = useDispatch()

  const [error, setError] = useState({
    isError: true,
    email: "",
    amount: "",
  });

  const [waiting, setWaiting] = useState(false);
  

  const [input, setInput] = useState({
    email: "",
    amount: "",
    currency: "",
  });
  const session = supabase.auth.session();
  const history = useHistory();
  const submit = false;
  const [transfer, setTransfer] = useState(false);
  let accountCreated = useSelector((state) => state.account);
  let fullAssets = useSelector(state => state.fullAssets)
  const classes = useStyles();

  const handleChange = async (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setError(
      await validate(
        {
          ...input,
          [event.target.name]: event.target.value,
        },
        fullAssets
      )
    );
    if (event.target.name === "amount") {
      setTransfer(false);
    }
  };

  const handleMail = async () => {
    let receiverId = await takereceiverId(input.email);
    if (receiverId) return receiverId;
    return undefined;
  };

  const handleTransaction = async (event) => {
    event.preventDefault();

    setWaiting(true);
    let receiverId = await handleMail();

    if (receiverId) {
      let info = await supabase
        .from("RegisteredUsers")
        .select("bannedUser")
        .eq("email", input.email);

      if (info.data[0].bannedUser) {
        Swal.fire({
          title: "Hold it!",
          text: `User is banned`,
          icon: "warning",
          confirmButtonText: "Cool",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        });
      } else {
        let sourceId = await takeSourceId();
        try {
          let succes = await axios.post("http://localhost:3001/payment", {
            sourceId: sourceId,
            receiverId: receiverId,
            amount: input.amount,
            currency: input.currency,
          });

          setInput({
            email: "",
            amount: "",
            currency: "",
          });
          setTransfer(true);
          setWaiting(false);
          dispatch(getFullBalance())
          dispatch(getBalance())
          Swal.fire({
            title: "Success!",
            html: `Your transfer <br> ${succes.data.amount} ${succes.data.currency} <br> Fee percentage <br> ${succes.data.feePercentage}% <br> Fee Amount <br> ${succes.data.fee} ${succes.data.currency} `,
            icon: "success",
            confirmButtonText: "Cool",
            background: "#1f1f1f",
            confirmButtonColor: "rgb(158, 158, 158)",
          });

          setInput({
            email: "",
            amount: "",
            currency: "",
          });
          setTransfer(true);
        } catch (error) {
          console.log("Error", error);
        }
      }
    } else {
      Swal.fire({
        title: "Uops!",
        text: `Mail is not registered`,
        icon: "error",
        confirmButtonText: "Ok",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }
  };


  return (
    <>
    {accountCreated ? 
      <Grid align="center">
        {session ? (
          <div>
            <Typography variant={ourMediaQuery?'h4':'h5'}>Transaction</Typography>
            <Typography variant={ourMediaQuery?'h6':'body'}>
              Search by email the person you want to transfer
            </Typography>
            <br />
            <Divider className={classes.divider} />
            {!waiting ? (
              <div>
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
                    />{" "}
                    <br />
                    <Select
                      disabled={!input.email || error.email}
                      fullWidth={true}
                      name="currency"
                      value={input.currency}
                      onChange={handleChange}
                    >
                      {fullAssets 
                        ? fullAssets.map((element) => (
                            <MenuItem
                              value={
                                element.asset_type === "native"
                                  ? "XLM"
                                  : element.asset_code
                              }
                            >
                              {element.asset_type === "native"
                                ? "XLM"
                                : element.asset_code}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                    <TextField
                      label={error.amount === "" ? "Amount" : error.amount}
                      name="amount"
                      type="text"
                      value={input.amount}
                      onChange={handleChange}
                      disabled={
                        input.currency && !error.email ? submit : !submit
                      }
                      color={error.amount === "" ? "primary" : "secondary"}
                      fullWidth={true}
                    />
                  </FormControl>
                  <br /> <br />
                  <Button
                    type="submit"
                    variant="outlined"
                    className={classes.yellowButton}
                    style={{ width: "60%", color: "#ffd523" }}
                    disabled={error.isError || transfer ? !submit : submit}
                  >
                    Transfer
                  </Button>{" "}
                  <br />
                </form>
              </div>
            ) : (
              <div align="center">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <HashLoader color={"#ffd523"} size={40} />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            )}
          </div>
        ) : (
          history.push("/")
        )}
      </Grid>
      : <div align='center'>
      <Typography variant="h4">You have to create an account to do transactions</Typography>
      </div>  }
    </>
  );
}
