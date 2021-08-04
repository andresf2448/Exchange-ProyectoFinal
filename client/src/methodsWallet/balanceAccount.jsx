import React, { useState } from "react";
import StellarSdk from "stellar-sdk";
import { useMediaQuery, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import useStyles from "styles";
import { supabase } from "../supabase/supabase";
// import CreateAccount from "./createAccount";
import HashLoader from "react-spinners/HashLoader";

export default function BalanceAccount() {
  const [account, setAccount] = useState(false);
  const [user, setUser] = useState(false);
  const classes = useStyles();
  const ourMediaQuery = useMediaQuery("(min-width:820px)");

  const session = supabase.auth.session();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const userExist = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    if (data.length === 0) setUser(false);
    if (data.length > 0) {
      setUser(() => true);
      getBalance()

    }
  };

  const getBalance = async () => {
    let { data } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);

    server
      .loadAccount(data[0]?.public_key)
      .then((response) => setAccount(response))
      .catch((err) => console.log(err));
  };
  userExist();

  return (
    <div>
      {user ? (
        <div>
          {account ? (
            <div>
              <TableContainer className={classes.adminTableContainer} style={{marginBottom:'3vh', marginTop:'3vh'}}>
                <Table stickyHeader className={classes.adminTable} padding={ourMediaQuery?'normal':'none'} size={ourMediaQuery?'medium':'small'}>
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
                        <TableRow hover={{backgroundColor:'black'}}>
                          <TableCell align='center' size={ourMediaQuery?'medium':'small'}>{!asset_code ? "XLM" : asset_code}</TableCell>
                          <TableCell align='center' size={ourMediaQuery?'medium':'small'}>{parseFloat(balance).toFixed(2)}</TableCell>
                          <TableCell align='center' size={ourMediaQuery?'medium':'small'}>{parseFloat(selling_liabilities).toFixed(2)}</TableCell>
                          <TableCell align='center' size={ourMediaQuery?'medium':'small'}>{parseFloat(buying_liabilities).toFixed(2)}</TableCell>
                        </TableRow>

                      )
                    })}
                  </TableBody>


                </Table>

              </TableContainer>
              
            </div>
          ) : (
            <HashLoader color={"#ffd523"} size={30} />
          )}
        </div>
      ) : (
        <Typography variant={ourMediaQuery?'h4':'body'}>
          Create an account to see your balance
        </Typography>
      )}
    </div>
  );
}
