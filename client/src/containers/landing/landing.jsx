import { Container, Grid, Typography, Button, Divider, Box, Card } from "@material-ui/core";
// import {CryptoGraphics} from 'components/cryptoGraphics/cryptoGraphics';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SecurityIcon from '@material-ui/icons/Security';
import stellarIcon from './stellar.svg';
import balance from './balance.svg';
import Faq from 'components/faq/faq';
import useStyles from 'styles';
import './landing.css';
import { Link,  } from 'react-scroll';




const Landing = () => {
    const classes = useStyles();

    return (
        <Container className='landing'>
            <Grid container xs={12} className={classes.landingContainers} spacing={2}>
                <Grid item xs={3}>
                    <Typography variant="h4"> 
                        <Link activeClass="active"
                        to="mainTitle"
                        spy={true}
                        smooth={true}
                        hashSpy={true}
                        offset={50}
                        duration={500}>
                            RocketExChange
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={2}> 
                    <Typography variant="h4">
                        <Link activeClass="active"
                            to="cryptos"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={50}
                            duration={500}>
                                Cryptos 
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={2}> 
                    <Typography variant="h4"> 
                        <Link activeClass="active"
                            to="rocketFeatures"
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={50}
                            duration={500}>
                                About us 
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={2}> 
                    <Typography variant="h4">
                        <Link activeClass="active"
                                to="frequencyQuestion"
                                spy={true}
                                smooth={true}
                                hashSpy={true}
                                offset={50}
                                duration={500}>
                                    FAQ  
                        </Link> 
                    </Typography>
                </Grid>
                <Grid container xs={3} justifyContent="space-around">
                    <Button  color="secundary" variant="contained" justifyContent="left">Crear cuenta</Button> 
                    <Button color="primary" variant="contained" justifyContent="left">ingresar</Button>
                </Grid>
            </Grid>

            <Divider variant="middle"/>

            <div className="mainTitle">
                <Grid container xs={12} className="titleContainer">
                    <Typography item xs={8} variant="h2" align="left" > Hacé rendir tu dinero con criptomonedas</Typography>
                    <Box item xs={4} fontSize={22} fontStyle="oblique"> Apostá al futuro de las finanzas y ahorrá sin restricciones</Box >
                </Grid>

                <Grid container xs={12} className={classes.landingContainers} spacing={6} justifyContent="flex-end">
                    <Box fontSize={35} letterSpacing={4} spacing={6}> ¡Comprá criptomonedas fácil y sin vueltas!</Box>
                </Grid>
            </div>

            <div className="cryptos">
                <Card container xs={12} className='CryptoConteinerCard' elevation={8}>
                    <Grid item xs={12} className={classes.landingContainers} spacing={6}>
                        <Grid item className="crypto-graphics">
                            {/* <CryptoGraphics /> */}
                        </Grid>
                    </Grid>
                </Card>
            </div>


            <div className="rocketFeatures">
                <Grid container className={classes.landingContainers} spacing={6}>
                    <Typography item xs={12} variant="h4"> ¿Qué podés hacer con RocketExChange? </Typography>
                </Grid>
                <Grid container xs={12} justifyContent="space-around" >
                        <Card item xs={3} className={classes.landingCard}>
                            <MonetizationOnIcon fontSize="large"/>
                            <Typography>Envía y recibí dinero de forma rápida y segura</Typography>
                        </Card>
                        <Card item xs={3} className={classes.landingCard}>
                            <SecurityIcon fontSize="large"/>
                            <Typography>Adquirí tus cryptomonedas con seguridad</Typography>
                        </Card>
                        <Card item xs={3} className={classes.landingCard}>
                            <img className="cryptoIcons" src={stellarIcon} alt="no img"/>
                            <Typography>Operá dentro de la red Stellar</Typography>
                        </Card>
                        <Card item xs={3} className={classes.landingCard}>
                            <img className="cryptoIcons" src={balance} alt="no img"/>
                            <Typography >Utiliza nuestra plataforma para ver tus balances</Typography>
                        </Card>
                </Grid>
            </div>

            <div className="frequencyQuestion">
                <Grid container xs={12} className={classes.landingContainers} >
                    <Grid item xs= {6} >
                        <Typography variant="h4" > Preguntas frecuentes</Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <Faq />
                    </Grid>
                </Grid>
            </div>

            <Link 
                activeClass="active"
                to="landing"
                spy={true}
                smooth={true}
                hashSpy={true}
                offset={50}
                duration={500}
                className="toTopButton">
                    <Button>
                        up!
                    </Button>
            </Link>
        </Container>
    )
};
export default Landing;
