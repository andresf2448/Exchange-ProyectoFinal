import {Container, Grid} from '@material-ui/core';
import { Twitter } from 'components/twitter/twitter';
// import {CryptoGraphics} from 'components/cryptoGraphics/cryptoGraphics';


export const HomeGrid= ()=>{
    return (
        <Container maxWidth="lg">
            <Grid container m={12} className="home-container" spacing={2} justifyContent="center" alignContent="space-around">
                <Grid item className="crypto-graphics" m={12}>
                    {/* <CryptoGraphics /> */}
                </Grid>
                <Grid item className="crypto-graphics" m={12}>
                    <Twitter />
                </Grid>
            </Grid>
        </Container>
    )
}