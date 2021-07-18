import { Container, Grid } from "@material-ui/core";
import { CryptoCalculator } from "components/cryptoCalculator/cryptoCalculator";
import TradingView from "components/tradingView/tradingView";
import ManageBuyOffer from "methodsWallet/manageBuyOffer";
import Orderbook from "methodsWallet/orderbook";

export default function Trade(){
    return(
        <Container maxWidth='lg'>
            <Grid container>
                <Grid item xs={12} sm={9}>
                    <TradingView />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CryptoCalculator/>
                </Grid>
                <Grid item xs={4}>
                    <ManageBuyOffer />
                </Grid>
                
                <Grid item sm={6}>
                    <Orderbook />
                </Grid>
                
            </Grid>
        </Container>
    )
}