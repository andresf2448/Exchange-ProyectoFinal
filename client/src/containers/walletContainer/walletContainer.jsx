import CreateAccount from "methodsWallet/createAccount";
import Transaction from "components/transaction/transaction";
import TransactionsHistory from "methodsWallet/historyTransactions";
import { Deposit } from "components/deposit/deposit";
import BalanceAccount from "methodsWallet/balanceAccount";
import { Withdraw } from "components/withdraw/withdraw";
import MergeAccount from "methodsWallet/mergeAccount";
import { supabase } from "../../supabase/supabase";
import StellarSdk from "stellar-sdk";
import {
  Card,
  Tabs,
  Tab,
  Grid,
  AppBar,
  useMediaQuery,
} from "@material-ui/core";
import { useState } from "react";
import useStyles from "styles";
import ChangeTrust from "methodsWallet/trustLines";
import ClaimableBalances from "methodsWallet/claimableBalances";

export default function WalletContainer() {
  const [publicKey, setPublicKey] = useState();
  const [secretKey, setSecretKey] = useState();
  const [account, setAccount] = useState();
  const [assets, setAssets] = useState();
  const session = supabase.auth.session();
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  const ourMediaQuery = useMediaQuery("(min-width:820px)");

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
        <AppBar
          position="static"
          className={ourMediaQuery ? classes.appBar : classes.appBarResponsive}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            centered={true}
          >
            <Tab
              label="Get key"
              className={
                ourMediaQuery ? classes.tabsNormal : classes.tabsResponsive
              }
            />
            <Tab
              label="Balance"
              className={
                ourMediaQuery ? classes.tabsNormal : classes.tabsResponsive
              }
            />
            <Tab
              label="Transaction"
              className={
                ourMediaQuery ? classes.tabsNormal : classes.tabsResponsive
              }
            />
            <Tab label="Transaction history" 
              className={
                ourMediaQuery ? classes.tabsNormal : classes.tabsResponsive
              }
            />
            <Tab
              label="Change trust"
              className={
                ourMediaQuery ? classes.tabsNormal : classes.tabsResponsive
              }
            />
            <Tab label="Claimable Balances" 
              className={
                ourMediaQuery ? classes.tabsNormal : classes.tabsResponsive
              }
            />
            <Tab
              label="Deposit"
              className={
                ourMediaQuery ? classes.tabs1 : classes.tabs1Responsive
              }
            />
            <Tab
              label="Withdraw"
              className={
                ourMediaQuery ? classes.tabs2 : classes.tabs2Responsive
              }
            />
          </Tabs>
        </AppBar>
      </Grid>

      <Grid item xs={10}>
        <Card elevation={3} className={classes.cardContainer}>
          {value === 0 && <CreateAccount assets={assets} />}
          {value === 1 && <BalanceAccount assets={assets} />}
          {value === 2 && <Transaction />}
          {value === 3 && <TransactionsHistory publicKey={publicKey} />}
          {value === 4 && (
            <ChangeTrust
              publicKey={publicKey}
              secretKey={secretKey}
              assets={assets}
              account={account}
            />
          )}
          {value === 5 && (
            <MergeAccount
              secretKey={secretKey}
              publicKey={publicKey}
            />
          )}
          {value === 6 && (
            <ClaimableBalances
              secretKey={secretKey}
              publicKey={publicKey}
              assets={assets}
            />
          )}
          {value === 7 && <Deposit />}
          {value === 8 && <Withdraw />}
        </Card>
      </Grid>
    </Grid>
  );
}
