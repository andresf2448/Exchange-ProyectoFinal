import StellarSdk from "stellar-sdk";
import { useState } from "react";
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import useStyles from "styles";
// import Transaction from "components/transaction/transaction";


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
        <TableContainer className={classes.trustLineTableContainer} style={{ marginBottom: '2vh', marginTop:'2vh' }}>
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
        
    </div>
  );
}
