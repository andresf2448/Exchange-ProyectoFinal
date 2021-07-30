import axios from "axios";
import { useState, useEffect } from "react";
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
} from "@material-ui/core";
import useStyles from "styles";
import Swal from "sweetalert2";
import StellarSdk from "stellar-sdk";

import HashLoader from "react-spinners/HashLoader";

export default function Transaction() {
  const [error, setError] = useState({
    isError: true,
    email: "",
    amount: "",
  });

  const [waiting, setWaiting] = useState(false);
  const [account, setAccount] = useState(false);

  const [input, setInput] = useState({
    email: "",
    amount: "",
    currency: "",
  });
  const session = supabase.auth.session();
  const history = useHistory();
  const submit = false;
  const [transfer, setTransfer] = useState(false);
  const [user, setUser] = useState(false);
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

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
        account.balances
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

    let { data } = await supabase
      .from("UserAnchor")
      .select("firstName, lastName")
      .eq("id_user", session.user.id);

    if (data.length < 1) {
      return Swal.fire({
        title: 'Hold it!',
        text: "You need to complete your profile to do a transaction",
        icon: 'warning',
        confirmButtonText: 'Got it',
        background: '#1f1f1f',
        confirmButtonColor:'rgb(158, 158, 158)',
      });
    }
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
          let succes = await axios.post("/payment", {
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

  const userExist = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    if (data.length === 0) setUser(false);
    if (data.length > 0) {
      getBalance();
      setUser(true);
    }
  };

  const getBalance = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    await server
      .loadAccount(data[0]?.public_key)
      .then((response) => setAccount(response))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userExist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid align="center">
        {session ? (
          <div>
            <Typography variant="h4">Transaction</Typography>
            <Typography variant="h5">
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
                      {account && user
                        ? account.balances?.map((element) => (
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
    </>
  );
}
