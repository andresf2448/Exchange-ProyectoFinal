import StellarSdk from "stellar-sdk";
import { useState, useEffect, useMemo } from "react";
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import useStyles from "styles";
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";

export default function HistoryTransactions({ publicKey }) {
  const [transactions, setTransactions] = useState({
    history: [],
    error: false,
    loading: false,
  });
  const server = useMemo(
    () => new StellarSdk.Server("https://horizon-testnet.stellar.org"),
    []
  );
  const classes = useStyles();

  useEffect(() => {
    if (publicKey) getTransactions();
  }, [publicKey]); // eslint-disable-next-line

  const getTransactions = () => {
    setTransactions({ ...transactions, loading: true });
    server
      .transactions()
      .forAccount(publicKey)
      .call()
      .then(function (page) {
        if (page.records.length === 0) {
          return setTransactions({ ...transactions, error: true, loading: false });
        }
        transactions.history.push(page.records);
        return setTransactions({ ...transactions, loading: false });
      })
      .catch(function (err) {
        setTransactions({ ...transactions, error: true, loading: false });
        console.log(err);
      });
  };

  const getDetail = (e) => {
    server
      .transactions()
      .transaction(e.target.innerText)
      .call()
      .then((response) => {
        return Swal.fire({
          text: `Id: ${response.id} 
           State: ${response.successful} Fee: ${response.fee_charged}`,
          confirmButtonText: "Ok",
          background: "#1f1f1f",
          confirmButtonColor: "rgb(158, 158, 158)",
        });
      });
  };

  return (
    <div>
      {transactions.history.length > 0 && !transactions.loading ? (
        <TableContainer
          className={classes.adminTableContainer}
          style={{ marginBottom: "2vh", marginTop: "2vh" }}
        >
          <Table className={classes.adminTable} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">N°</TableCell>
                <TableCell align="center">ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.history[0] &&
                transactions.history[0].map((transaction, i) => (
                  <TableRow
                    key={transaction.id}
                    hover={{ backgroundColor: "black" }}
                  >
                    <TableCell align="center">{(i += 1)}</TableCell>
                    <TableCell align="center" onClick={(e) => getDetail(e)}>
                      {transaction.id}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <HashLoader color={"#ffd523"} size={30} />
      )}
      {transactions.error ? (
        <Grid>
          <Typography variant="h4">
            You haven´t made transactions yet
          </Typography>
        </Grid>
      ) : null}
    </div>
  );
}
