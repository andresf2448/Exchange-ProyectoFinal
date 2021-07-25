import CreateAccount from "methodsWallet/createAccount";
import Transaction from "components/transaction/transaction";
import { TransactionsHistory } from "components/transactionsHistory/transactionsHistory";
import { Deposit } from "components/deposit/deposit";
import BalanceAccount from "methodsWallet/balanceAccount";
import { Withdraw } from "components/withdraw/withdraw";
import { Container, Tabs, Tab } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssets } from "redux/actions/actions";

export default function WalletContainer() {
  const assets = useSelector((store) => store.assets);
  const dispatch = useDispatch();
  useEffect(() => {
    if (assets.legth === 0) dispatch(getAssets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <Container>
      <Tabs value={value} onChange={handleChange} centered={true}>
        <Tab label="Get Key" />
        <Tab label="Balance" />
        <Tab label="Transaction" />
        <Tab label="TransactionHistory" />
        <Tab label="Deposit" />
        <Tab label="Withdraw" />
      </Tabs>

      {value === 0 && <CreateAccount assets={assets} />}
      {value === 1 && <BalanceAccount assets={assets} />}
      {value === 2 && <Transaction assets={assets} />}
      {value === 3 && <TransactionsHistory />}
      {value === 4 && <Deposit />}
      {value === 5 && <Withdraw />}
    </Container>
  );
}
