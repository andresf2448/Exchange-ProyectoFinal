import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  Grid,
  Typography,
  Card,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import useStyles from "styles.js";

//API de cryptocompare.com

export const CryptoCalculator = () => {
  const classes = useStyles();
  const [convertion, setConvertion] = useState({
    firstCoin: "",
    secondCoin: "",
    amount: 0,
  });
  const [result, setResult] = useState("");
  const [firstCurrency, setFirstCurrency] = useState(1);
  const [secondCurrency, setSecondCurrency] = useState(1);

  async function convert() {
    if (convertion.amount === 0 || !convertion.amount) {
      return Swal.fire({
        title: "Uops!",
        text: "Amount required",
        icon: "warning",
        confirmButtonText: "Cool",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }
    if (
      convertion.firstCoin === "" ||
      convertion.firstCoin === 1 ||
      convertion.secondCoin === "" ||
      convertion.secondCoin === 1
    ) {
      return Swal.fire({
        title: "Uops!",
        text: "Invalid currency",
        icon: "warning",
        confirmButtonText: "Ups",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }
    let currencies = await axios.get(
      `https://min-api.cryptocompare.com/data/price?api_key={0aec49a900c2d7469630114260688bb1914813d1f365aa38f494f6c8a6e946d1}&fsym=${convertion.firstCoin}&tsyms=${convertion.secondCoin}`
    );
    if (currencies.data.Response === "Error") {
      return Swal.fire({
        title: "Hmmmmm!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
        background: "#1f1f1f",
        confirmButtonColor: "rgb(158, 158, 158)",
      });
    }
    var total = Object.values(currencies.data)[0] * convertion.amount;

    setResult(total);
  }

  function handleChange(orderCoin, e) {
    if (orderCoin === "first") {
      setFirstCurrency(e.target.value);

      setConvertion({ ...convertion, firstCoin: e.target.value });
      return;
    }
    setSecondCurrency(e.target.value);
    setConvertion({ ...convertion, secondCoin: e.target.value });
  }

  useEffect(() => {
    if (convertion.amount === 0 || convertion.amount === "") {
      setResult("");
    }
  }, [convertion]);

  useEffect(() => {
    setResult("");
  }, [convertion]);

  return (
    <Card
      className={classes.cardSaleOffer}
      style={{ width: "15vw", height: "20vh" }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography
            style={{
              textAlign: "center",
              marginBottom: "1vh",
            }}
          >
            Currency Converter
          </Typography>
        </Grid>

        <Grid item xs={1}></Grid>
        <Grid item xs={5} style={{ marginBottom: "1vh" }}>
          <Select
            displayEmpty
            value={firstCurrency}
            onChange={(e) => handleChange("first", e)}
          >
            <MenuItem disabled value={1}>
              Currency
            </MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="ARS">ARS</MenuItem>
            <MenuItem value="BTC">Bitcoin</MenuItem>
            <MenuItem value="ETH">Ethereum</MenuItem>
            <MenuItem value="XLM">XLM</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <TextField
            type="text"
            required
            placeholder="Amount"
            onChange={(e) =>
              setConvertion({ ...convertion, amount: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={1}></Grid>

        <Grid item xs={1}></Grid>
        <Grid item xs={5} style={{ marginBottom: "2vh" }}>
          <Select
            displayEmpty
            value={secondCurrency}
            onChange={(e) => handleChange("second", e)}
          >
            <MenuItem disabled value={1}>
              Currency
            </MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="ARS">ARS</MenuItem>
            <MenuItem value="BTC">Bitcoin</MenuItem>
            <MenuItem value="ETH">Ethereum</MenuItem>
            <MenuItem value="XLM">XLM</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <TextField type="text" disabled value={result} />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} style={{marginLeft:'1vw'}}>
          <Button
            className={classes.invitedYellowButton}
            fullWidth={true}
            onClick={() => convert()}
            disabled={
              convertion.firstCoin === "" ||
              convertion.secondCoin === "" ||
              convertion.amount === 0 ||
              convertion.amount === ""
            }
          >
            Convert
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
