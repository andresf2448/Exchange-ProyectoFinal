import CreateAccount from "methodsWallet/createAccount";
import Transaction from "components/transaction/transaction";
/* import TransactionsHistory from "methodsWallet/historyTransactions"; */
import { Deposit } from "components/deposit/deposit";
import BalanceAccount from "methodsWallet/balanceAccount";
import { Withdraw } from "components/withdraw/withdraw";
import { supabase } from "../../supabase/supabase";
import StellarSdk from "stellar-sdk";
import { Card, Tabs, Tab, Grid, AppBar } from "@material-ui/core";
import { useState } from "react";
import useStyles from "styles";
import ChangeTrust from "methodsWallet/trustLines";

export default function WalletContainer() {
  const [publicKey, setPublicKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const [account, setAccount] = useState();
  const [assets, setAssets] = useState();
  const session = supabase.auth.session();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

  const keys = async () => {
    const { data: assets } = await supabase.from("assets").select("*");
    setAssets(assets);

    const { data: public_key } = await supabase
      .from("datauser")
      .select("public_key")
      .eq("id_user", session.user.id);
    const { data: secretKey } = await supabase
      .from("wallet")
      .select("secret_key")
      .eq("id_user", session.user.id);
    await setPublicKey(public_key[0]?.public_key);
    return setSecretKey(secretKey[0]?.secret_key);
  };

  if (publicKey && !account) {
    server.loadAccount(publicKey).then((account) => setAccount(account));
  }

  if (!publicKey) {
    keys();
  }

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={2}>
        <AppBar position="static" style={{ height: "87vh" }}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            variant="fullWidth"
          >
            <Tab label="Get key" />
            <Tab label="Balance" />
            <Tab label="Transaction" />
            {/* <Tab label="Transaction history" /> */}
            <Tab label="Change trust" />
            <Tab label="Deposit" className={classes.tabs1} />
            <Tab label="Withdraw" className={classes.tabs2} />
          </Tabs>
        </AppBar>
      </Grid>

      <Grid item xs={10}>
        <Card elevation={3} className={classes.cardContainer}>
          {value === 0 && <CreateAccount assets={assets} />}
          {value === 1 && <BalanceAccount assets={assets} />}
          {value === 2 && <Transaction />}
          {/* {value === 3 && <TransactionsHistory publicKey={publicKey} />} */}
          {value === 3 && (
            <ChangeTrust
              publicKey={publicKey}
              secretKey={secretKey}
              assets={assets}
              account={account}
            />
          )}
          {value === 4 && <Deposit />}
          {value === 5 && <Withdraw />}
        </Card>
      </Grid>
    </Grid>
  );
}
