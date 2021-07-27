import CreateAccount from "methodsWallet/createAccount";
import Transaction from "components/transaction/transaction";
import { TransactionsHistory } from "components/transactionsHistory/transactionsHistory";
import { Deposit } from "components/deposit/deposit";
import BalanceAccount from "methodsWallet/balanceAccount";
import { Withdraw } from "components/withdraw/withdraw";

import { Card, Tabs, Tab, Grid, AppBar } from "@material-ui/core";
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";     
import useStyles from 'styles';
import { getAssets } from "redux/actions/actions";
       
export default function WalletContainer(){
  const assets = useSelector((store) => store.assets);
  const dispatch = useDispatch();
  useEffect(() => {
    if (assets.legth === 0) dispatch(getAssets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    const classes = useStyles();

    return(
            <Grid container >
                <Grid item xs={2} alignItems="flex-start">
                    <AppBar position="static" style={{height:'87vh'}} >
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
                    <Card elevation={3} className={classes.cardContainer}>
                        {value === 0 && <CreateAccount assets={assets} />}      
                        {value === 1 && <BalanceAccount assets={assets} />}
                        {value === 2 && <Transaction  />}
                        {value === 3 && <TransactionsHistory/>}
                        {value === 4 && <Deposit/>}
                        {value === 5 && <Withdraw/>}
                    </Card>
                </Grid>
            </Grid>

    )
}