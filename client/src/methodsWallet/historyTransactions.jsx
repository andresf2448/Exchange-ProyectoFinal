import StellarSdk from "stellar-sdk";
import { useState } from "react";
import { Container, Grid, Typography, Divider } from "@material-ui/core";
import useStyles from "styles";

export default function HistoryTransactions({ publicKey }) {
  const [transactions, setTransactions] = useState();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const classes = useStyles();

  if (!transactions) {
    server
      .transactions()
      .forAccount(publicKey)
      .call()
      .then(function (page) {
        setTransactions(page.records);
        return page.next();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <Container style={{ height: "50vh" }}>
      <Typography variant="h4" align="center">
        {" "}
        Your Transactions{" "}
      </Typography>
      <Divider variant="middle" className={classes.divider} />
      <Grid align="center" style={{ overflowY: "scroll", height: "40vh" }}>
        <ul style={{ listStyle: "none", textAlign: "left" }}>
          {transactions &&
            transactions.map((transaction, i) => (
              <li key={transaction.id}>
                {i} - id de transaction: {transaction.id}
              </li>
            ))}
        </ul>
      </Grid>
    </Container>
  );
}
