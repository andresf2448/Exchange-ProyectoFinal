import StellarSdk from "stellar-sdk";
import { useState } from "react";
import { Container, Grid, Typography, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import useStyles from "styles";
import Transaction from "components/transaction/transaction";


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
    <div >
      
      {/* <Divider variant="middle" className={classes.divider} /> */}
      {/* style={{ overflowY: "scroll", height: "40vh" }} */}
      {/* <Grid align="center"  > */}
        <TableContainer className={classes.adminTableContainer} style={{ marginBottom: '2vh', marginTop:'2vh' }}>
          <Table className={classes.adminTable} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align='center'>N°</TableCell>
                <TableCell align='center'>ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions && transactions.map((transaction, i) => (
                <TableRow key={transaction.id} hover={{ backgroundColor: 'black' }}>
                  <TableCell align='center'>{i += 1}</TableCell>
                  <TableCell align='center'>{transaction.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <ul style={{ listStyle: "none", textAlign: "left" }}>
          {transactions &&
            transactions.map((transaction, i) => (
              <li key={transaction.id}>
                {i} - id de transaction: {transaction.id}
              </li>
            ))}
        </ul> */}
      {/* </Grid> */}
    </div>
  );
}

{/* <TableContainer className={classes.adminTableContainer} style={{ marginBottom: '3vh', marginTop: '3vh' }}>
  <Table stickyHeader className={classes.adminTable}>
    <TableHead>
      <TableRow>
        <TableCell align='center'>Asset</TableCell>
        <TableCell>Balance</TableCell>
        <TableCell>Mount of selling offers</TableCell>
        <TableCell>Mount of buying offers</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {account?.balances?.map(({ balance, asset_code, selling_liabilities, buying_liabilities }, index) => {
        return (
          <TableRow hover={{ backgroundColor: 'black' }}>
            <TableCell align='center'>{!asset_code ? "XLM" : asset_code}</TableCell>
            <TableCell align='center'>{parseFloat(balance).toFixed(2)}</TableCell>
            <TableCell align='center'>{parseFloat(selling_liabilities).toFixed(2)}</TableCell>
            <TableCell align='center'>{parseFloat(buying_liabilities).toFixed(2)}</TableCell>
          </TableRow>

        )
      })}
    </TableBody>


  </Table>

</TableContainer> */}
