import { Container, Grid, Card } from "@material-ui/core";
import { CryptoCalculator } from "components/cryptoCalculator/cryptoCalculator";
import ManageBuyOffer from 'methodsWallet/manageBuyOffer';
import Orderbook from 'methodsWallet/orderbook';
import TradingView from "components/tradingView/tradingView";

export default function Trade(){
    return(
        <Container maxWidth='lg'>
            <Grid container>
                <Grid container item display='column'  justifyContent={true}>
                    <Grid item xs={12} sm={3} style={{height:'700px'}}>
                        <Orderbook />
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                        <Grid item xs={12} style={{height:'400px', paddingRight:'25px', paddingTop:'40px'}}>
                            <TradingView />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ManageBuyOffer />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ManageBuyOffer />
                        </Grid>
                    </Grid>
                    <Grid container item sm={3}>
                        <Grid item xs={12} style={{height:'300px', paddingTop:'40px'}}>
                            <Card style={{height:'300px'}}>Listado de ventas activas</Card>
                        </Grid>
                        <Grid item xs={12}>
                            <CryptoCalculator/>
                        </Grid>
                    </Grid>
                    <Grid item xs={0} sm={3}></Grid>
                    <Grid item xs={0} sm={3}></Grid>
                </Grid>
            </Grid>
        </Container>
    )
}