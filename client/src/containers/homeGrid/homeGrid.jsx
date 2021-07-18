import {Container, Grid} from '@material-ui/core';
// import {CryptoGraphics} from 'components/cryptoGraphics/cryptoGraphics';
// import {AboutPreview} from 'components/aboutPreview/aboutPreview';
// import {Statistics} from 'components/statistics/statistics';
// import {CryptoCalculator} from 'components/cryptoCalculator/cryptoCalculator';
import { Twitter } from 'components/twitter/twitter';

export const HomeGrid= ()=>{
    return (
        <Container maxWidth="lg">
            <Grid container className="home-container" spacing={2} justifyContent="center">
                <Grid item xs={12} container spacing={2} justifyContent="center" alignContent="space-around">
                    <Grid item className="crypto-graphics" xs={12}>
                        <Twitter />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}