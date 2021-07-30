import {
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  Box,
  Card,
  Modal,
} from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SecurityIcon from "@material-ui/icons/Security";
import stellarIcon from "./stellar.svg";
import balance from "./balance.svg";
import pic from "./cryptographicsPic.png";
import Faq from "components/faq/faq";
import useStyles from "styles";
import "./landing.css";
import { Link } from "react-scroll";
import { supabase } from "supabase/supabase";
import { useHistory } from "react-router";
import { useState } from "react";
import Register from "components/register/register";
import Login from "components/login/login";
import logoRXC from "./rocketXchange-transparent.png";
//import { BorderColor } from "@material-ui/icons";

const Landing = () => {
  const classes = useStyles();
  const history = useHistory();
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  let session = supabase.auth.session();

  const handleRegister = () => {
    setRegisterModal(!registerModal);
  };
  const handleLogin = () => {
    setLoginModal(!loginModal);
  };

  return (
    <Container className="landing">
      {session ? history.push("/home") : null}
      <Grid container xs={12} className={classes.landingContainers} spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h5">
            <Link
              activeClass="active"
              to="presentation"
              spy={true}
              smooth={true}
              hashSpy={true}
              offset={50}
              duration={500}
              className="navItems"
            >
              RocketXChange
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h5">
            <Link
              activeClass="active"
              to="cryptos"
              spy={true}
              smooth={true}
              hashSpy={true}
              offset={50}
              duration={500}
              className="navItems"
            >
              Cryptos
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h5">
            <Link
              activeClass="active"
              to="rocketFeatures"
              spy={true}
              smooth={true}
              hashSpy={true}
              offset={50}
              duration={500}
              className="navItems"
            >
              About us
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h5">
            <Link
              activeClass="active"
              to="frequencyQuestion"
              spy={true}
              smooth={true}
              hashSpy={true}
              offset={50}
              duration={500}
              className="navItems"
            >
              FAQ
            </Link>
          </Typography>
        </Grid>
        <Grid container xs={3} justifyContent="space-around">
          <Button
            style={{
              backgroundColor: "#000",
              color: "#ffd523",
              borderColor: "#ffd523",
              border: "1px solid ",
            }}
            onClick={handleRegister}
          >
            REGISTER
          </Button>
          <Modal
            open={registerModal}
            onClose={handleRegister}
            style={{ zIndex: "1000", position: "fixed" }}
          >
            <Register />
          </Modal>
          <Button
            color="primary"
            variant="contained"
            onClick={handleLogin}
            style={{ color: "#000", backgroundColor: "#ffd523" }}
          >
            LOGIN
          </Button>
          <Modal
            open={loginModal}
            onClose={handleLogin}
            style={{ zIndex: "1000" }}
          >
            <Login />
          </Modal>
        </Grid>
      </Grid>

      <Divider
        variant="middle"
        style={{ margin: "1%", backgroundColor: "#fdfbfb" }}
      />

      <div className="presentation">
        <Grid container className="titleContainer">
          <Typography xs={8} variant="h2">
            {" "}
            Make your money work with cryptocurrencies
          </Typography>
          <Box xs={4} fontSize={22} fontStyle="oblique">
            Bet on the future of finance and save without restrictions
          </Box>
        </Grid>
        <Grid container xs={12} spacing={6} justifyContent="flex-end">
          <Box
            className={classes.presentationBox}
            letterSpacing={4}
            spacing={6}
            alignItems="center"
          >
            <Typography xs={4} variant="h5">
              Trades here are peer-to-peer! On StellarX you trade directly with
              other traders. There’s no one in the middle. You always have sole
              control of your assets.
            </Typography>
          </Box>
        </Grid>
      </div>

      <div className="register">
        <Grid container className={classes.landingRegister} align="center">
          <Grid item xs={12}>
            <Typography
              variant="h4"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              Don't let time go by, start trading now!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img
              className="logoRxC"
              src={logoRXC}
              alt="rocketXchange-transparent"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={handleRegister}
              style={{
                width: "50%",
                backgroundColor: "#ffd523",
                color: "#272727b3",
                letterSpacing: "4px",
              }}
              variant="contained"
            >
              REGISTER!
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className="cryptos">
        <Grid
          container
          xs={12}
          className={classes.landingContainers}
          style={{ padding: "5%", justifyContent: "center" }}
        >
          <Typography xs={5} variant="h4" className={classes.landingCard}>
            Get in real time the waves of the cryptos with the highest volume to
            make better investments!
          </Typography>
          <Grid item xs={7}>
            <img
              src={pic}
              alt="cryptographicsRealtimePic"
              className="landingPic"
            />
          </Grid>
        </Grid>
      </div>

      <div className="rocketFeatures">
        <Grid>
          <Typography variant="h4" className="rocketFeaturesTypography">
            {" "}
            What can you do with RocketExChange?{" "}
          </Typography>
        </Grid>
        <Grid
          container
          xs={12}
          justifyContent="space-evenly"
          className="aboutGrid"
        >
          <Card xs={3} className={classes.landingCards}>
            <MonetizationOnIcon fontSize="large" />
            <Typography>
              The better way to trade directly with other traders. There’s no
              one in the middle!
            </Typography>
          </Card>
          <Card xs={3} className={classes.landingCards}>
            <SecurityIcon fontSize="large" />
            <Typography> Acquire your cryptocurrencies safely</Typography>
          </Card>
          <Card xs={3} className={classes.landingCards}>
            <img className="cryptoIcons" src={stellarIcon} alt="no img" />
            <Typography>Deposit and withdraw, fiat and crypto</Typography>
          </Card>
          <Card xs={3} className={classes.landingCards}>
            <img className="cryptoIcons" src={balance} alt="no img" />
            <Typography>Use our platform to see your balances</Typography>
          </Card>
        </Grid>
      </div>

      <div className="frequencyQuestion">
        <Grid container xs={12} className={classes.landingContainers}>
          <Grid item xs={12}>
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
        className="toTopButton"
      >
        <Button>up!</Button>
      </Link>
    </Container>
  );
};
export default Landing;
