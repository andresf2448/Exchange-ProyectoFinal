import {Container, Grid} from '@material-ui/core';
import {CryptoGraphics} from 'components/cryptoGraphics/cryptoGraphics';
import {AboutPreview} from 'components/aboutPreview/aboutPreview';
import {Statistics} from 'components/statistics/statistics';
import {CryptoCalculator} from 'components/cryptoCalculator/cryptoCalculator';

export const HomeGrid= ()=>{
    return (
        <Container maxWidth="xl">
            <Grid container className="home-container"  spacing={2} justifyContent="center">
                <Grid item xs={9} container spacing={2} justifyContent="center" alignContent="space-around">
                    <Grid item className="crypto-graphics" xs={12}>
                        <CryptoGraphics />
                    </Grid>
                    <Grid container className="home-container_boxLeft--bottom"  spacing={2}>
                        <Grid item className="about" xs={6}>
                            <AboutPreview/>
                        </Grid>
                        <Grid item className="statistics" xs={6}>
                            <Statistics/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{ width: "100%" }} className="crypto-calculator" xs={3}>
                    <CryptoCalculator/>
                </Grid>
            </Grid>
        </Container>
    )
}