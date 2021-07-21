import { Container, Grid, Typography, Button } from "@material-ui/core";
import {CryptoGraphics} from 'components/cryptoGraphics/cryptoGraphics';

const Landing = () => {
    return (
        <Container>
            <Grid container xs={12}>
                <Grid item xs={6} >
                    <Typography variant="h2" align="left" > Hacé rendir tu dinero con criptomonedas</Typography>
                    <Typography variant="subtitle1" align="left"> Apostá al futuro de las finanzas y ahorrá sin restricciones</Typography>
                    <Button color="primary" variant="contained" justifyContent="left">Registrarme</Button>
                </Grid>
                <Grid item xs={6}> 
                    <Typography variant="h3"> Imagen</Typography>
                </Grid>
            </Grid>
            <Grid container xs={12} >
                <Grid item xs= {12} >
                    <Typography variant="h4" > ¡Comprá criptomonedas fácil y sin vueltas!</Typography>
                </Grid>
                <Grid item className="crypto-graphics" xs={12}>
                    <CryptoGraphics />
                </Grid>
                <Grid item xs={12} ></Grid>
            </Grid>
        </Container>
    )
};

export default Landing;