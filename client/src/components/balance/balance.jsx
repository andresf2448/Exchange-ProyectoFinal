import { Container, Grid } from '@material-ui/core';
import ManageBuyOffer from '../../methodsWallet/manageBuyOffer.jsx'
// import BalanceAccount from '../../methodsWallet/balanceAccount'
import Orderbook from 'methodsWallet/orderbook.jsx';
import TradingView from 'components/tradingView/tradingView.jsx';
import { CryptoCalculator } from 'components/cryptoCalculator/cryptoCalculator.jsx';

export const Balance = () => {

    return (
        <Container>
            <ManageBuyOffer />
            <Grid container sm={12} justifyContent='space-between'>
                <Grid item sm={3}>
                  {/*   <Orderbook /> */}
                </Grid>
                <Grid item sm={9}>
                    <TradingView />
                </Grid>
                <Grid item>
                <CryptoCalculator/>
                </Grid>
            </Grid>
        </Container>
    )
}
