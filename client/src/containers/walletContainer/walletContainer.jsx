import CreateAccount from "methodsWallet/createAccount";
import Transaction from "components/transaction/transaction";
import { TransactionsHistory } from "components/transactionsHistory/transactionsHistory";
import { Deposit } from "components/deposit/deposit";
import BalanceAccount from "methodsWallet/balanceAccount";
import { Withdraw } from "components/withdraw/withdraw";
import { Card, Tabs, Tab, Grid, AppBar } from "@material-ui/core";
import { useState } from "react";
import useStyles from 'styles';

export default function WalletContainer(){
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    const classes = useStyles();

    return(
            <Grid container >
                <Grid item xs={2} alignItems="flex-start">
                    <AppBar position="static" style={{height:'91vh'}} >
                        <Tabs orientation="vertical" value={value} onChange={handleChange}>
                        <Tab label='Get Key'/>
                        <Tab label='Balance'/>
                        <Tab label='Transaction'/>
                        <Tab label='TransactionHistory'/>
                        <Tab label='Deposit'/>
                        <Tab label='Withdraw'/>
                        </Tabs>
                    </AppBar>
                </Grid>
                
                <Grid item  xs={10}>
                    <Card elevation={3} className={classes.cardCheck}>
                        {value === 0 && <CreateAccount />}      
                        {value === 1 && <BalanceAccount />}
                        {value === 2 && <Transaction/>}
                        {value === 3 && <TransactionsHistory/>}
                        {value === 4 && <Deposit/>}
                        {value === 5 && <Withdraw/>}
                    </Card>
                </Grid>
            </Grid>

    )
}