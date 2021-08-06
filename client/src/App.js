import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CardUser } from "components/cardUser/cardUser";
import "./App.scss";
import { Container, Grid } from "@material-ui/core";
import rocketLogo from './rocketXchange-logos_white.png';

const Login = lazy(() => import("components/login/login"));
const Register = lazy(() => import("components/register/register"));
const Home = lazy(() => import("containers/home/home"));
const RecoverPassword = lazy(() =>
  import("components/recoverPassword/recoverPassword")
);
const CheckoutForm = lazy(() => import("components/stripe/checkoutForm"));
const Faq = lazy(() => import("components/faq/faq"));
const About = lazy(() => import("components/about/about"));
const RestorePassword = lazy(() =>
  import("components/restorePassword/restorePassword")
);
const Toml = lazy(() => import("containers/toml/toml"));
const TransactionsPopup = lazy(() => import("methodsWallet/transactionsFlow"));
const DepositWallet = lazy(() => import("./methodsWallet/deposit/depositWallet"));
// const InitDeposit = lazy(() => import("./methodsWallet/deposit/initDeposit"));
const Landing = lazy(() => import("containers/landing/landing"));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense
          fallback={
            <Container>
              <Grid align="center" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img  alt="" src={rocketLogo} style={{height: '60%', width: '60%'}}/>
              </Grid>
            </Container>
          }
        >
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/recoverPassword" component={RecoverPassword} />
            <Route path="/payment" component={CheckoutForm} />
            <Route path="/faq" component={Faq} />
            <Route path="/about" component={About} />
            <Route path="/restorePassword" component={RestorePassword} />
            <Route path="/.well-known/stellar.toml" component={Toml} />
            <Route path="/deposit" component={DepositWallet} />
            <Route path="/kycflow" component={TransactionsPopup} />
            <Route path="/detailsUsers" component={CardUser} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
