import { Container, AppBar, Tabs, Tab } from "@material-ui/core";
import {useState} from 'react';
import { LoadingProfile } from "components/loadingProfile/loadingProfile";
import { TransactionsHistory } from "components/transactionsHistory/transactionsHistory";
import { Deposit } from "components/deposit/deposit";
import { Withdraw } from "components/withdraw/withdraw";

export function Settings() {
  const [value, setValue] = useState(0);

    const handleChange= (event, newValue)=>{
        event.preventDefault();
        setValue(newValue);
    }
  return (
    <Container maxWidth='md'>
      <AppBar position="static" >
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Profile"/>
                <Tab label="Transactions History"/>
                <Tab label="Deposit" />
                <Tab label="Withdraw"/>
            </Tabs>
            {value === 0 && <LoadingProfile/>}
            {value === 1 && <TransactionsHistory/>}
            {value === 2 && <Deposit/>}
            {value === 3 && <Withdraw/>}
        </AppBar>

    </Container>
  );
}
