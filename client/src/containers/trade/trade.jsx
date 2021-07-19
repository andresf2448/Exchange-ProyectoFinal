import { Container, Grid, Card } from "@material-ui/core";
import { CryptoCalculator } from "components/cryptoCalculator/cryptoCalculator";
import ManageBuyOffer from 'methodsWallet/manageBuyOffer';
import Orderbook from 'methodsWallet/orderbook';
import TradingView from "components/tradingView/tradingView";

export default function Trade(){
    return(
        <Container maxWidth='lg'>
            <Grid container>
                <Grid container item xs={12} sm={6} display='column'  justifyContent={true} spacing={6}>
                    <Grid item xs={0} sm={3}></Grid>
                    <Grid item xs={12} sm={6}>
                        <CryptoCalculator/>
                    </Grid>
                    <Grid item xs={0} sm={3}></Grid>
                    <Grid item xs={12} sm={6}>
                        <ManageBuyOffer />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ManageBuyOffer />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} style={{height:'400px'}}>
                    <TradingView />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Orderbook />
                </Grid>
                <Grid item xs={12} sm={6} style={{height:'500px', paddingTop:'40px'}}>
                    <Card style={{height:'500px'}}>Otra cosa</Card>
                </Grid>
            </Grid>
        </Container>
    )
}