import { Container, Grid, Typography, Button, Divider, Box, Card } from "@material-ui/core";
import {CryptoGraphics} from 'components/cryptoGraphics/cryptoGraphics';
import Faq from 'components/faq/faq';
import useStyles from 'styles';
import './landing.css';

const Landing = () => {
    const classes = useStyles();
    return (
        <Container>
            <Grid container xs={12} className={classes.landingContainers} spacing={2} >
                <Grid item xs={3} >
                    <Typography variant="h4"> RocketExChange </Typography>
                </Grid>
                <Grid item xs={2}> 
                    <Typography variant="h4"> Cryptos </Typography>
                </Grid>
                <Grid item xs={2}> 
                    <Typography variant="h4"> About us </Typography>
                </Grid>
                <Grid item xs={2}> 
                    <Typography variant="h4"> FAQ </Typography>
                </Grid>
                <Grid container xs={3} justifyContent="space-around">
                    <Button  color="secundary" variant="contained" justifyContent="left">Crear cuenta</Button> 
                    <Button color="primary" variant="contained" justifyContent="left">ingresar</Button>
                </Grid>
            </Grid>

            <Divider variant="middle"/>

            <Grid container xs={12} className="titleContainer">
                <Typography item xs={8} variant="h2" align="left" > Hacé rendir tu dinero con criptomonedas</Typography>
                <Box item xs={4} fontSize={22} fontStyle="oblique"> Apostá al futuro de las finanzas y ahorrá sin restricciones</Box >
            </Grid>

            <Grid container xs={12} className={classes.landingContainers} spacing={6} justifyContent="flex-end">
                <Box fontSize={35} letterSpacing={4} spacing={6}> ¡Comprá criptomonedas fácil y sin vueltas!</Box>
            </Grid>

            <Card container xs={12} className='CryptoConteinerCard' elevation={8}>
                <Grid item xs={12} className={classes.landingContainers} spacing={6}>
                    <Grid item className="crypto-graphics">
                        <CryptoGraphics />
                    </Grid>
                </Grid>
            </Card>

            <Grid container className={classes.landingContainers} spacing={6}>
                <Typography item xs={12} variant="h4"> ¿Qué podés hacer con RocketExChange? </Typography>
            </Grid>
            <Grid container xs={12} justifyContent="space-around">
                <Card item xs={3}>
                    <Typography>Envía y recibi dinero de forma segura e instantanea</Typography>
                </Card>
                <Card item xs={3}>
                    <Typography>Invertí con seguridad</Typography>
                </Card>
                <Card item xs={3}>
                    <Typography>Operá dentro de la red Stellar</Typography>
                </Card>
                <Card item xs={3}>
                    <Typography>Utiliza nuestra plataforma para ver tus balances</Typography>
                </Card>
            </Grid>







   
            <Grid container xs={12} className={classes.landingContainers} >
                <Grid item xs= {6} >
                    <Typography variant="h4" > Preguntas frecuentes</Typography>
                </Grid>
                <Grid item xs={6} >
                    <Faq />
                </Grid>
            </Grid>
        </Container>
    )
};

export default Landing;
