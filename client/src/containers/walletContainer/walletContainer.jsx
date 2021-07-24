import CreateAccount from "methodsWallet/createAccount";
import Transaction from "components/transaction/transaction";
import { TransactionsHistory } from "components/transactionsHistory/transactionsHistory";
import { Deposit } from "components/deposit/deposit";
import BalanceAccount from "methodsWallet/balanceAccount";
import { Withdraw } from "components/withdraw/withdraw";
import { Tabs, Tab, Grid, AppBar } from "@material-ui/core";
import { useState } from "react";

export default function WalletContainer(){
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
      };
    return(
            <Grid container >
                <Grid item xs={2} >
                    <AppBar position="static" style={{height:'91vh'}} >
                        <Tabs orientation="vertical" value={value} onChange={handleChange} centered={true}>
                            <Tab label='Get Key'/ >
                            <Tab label='Balance'/>
                            <Tab label='Transaction'/>
                            <Tab label='TransactionHistory'/>
                            <Tab label='Deposit'/>
                            <Tab label='Withdraw'/>
                        </Tabs>
                    </AppBar>
                </Grid>
                <Grid item  xs={10}>
                    {value === 0 && <CreateAccount />}      
                    {value === 1 && <BalanceAccount />}
                    {value === 2 && <Transaction/>}
                    {value === 3 && <TransactionsHistory/>}
                    {value === 4 && <Deposit/>}
                    {value === 5 && <Withdraw/>}
                </Grid>
            </Grid>

    )
}