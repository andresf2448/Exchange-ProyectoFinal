import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CardUser } from "components/cardUser/cardUser";
import "./App.scss";


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
const Deposit = lazy(() => import("./methodsWallet/deposit/deposit"));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/recoverPassword" component={RecoverPassword} />
            <Route path="/payment" component={CheckoutForm} />
            <Route path="/faq" component={Faq} />
            <Route path="/about" component={About} />
            <Route path="/restorePassword" component={RestorePassword} />
            <Route path="/.well-known/stellar.toml" component={Toml} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/kycflow" component={TransactionsPopup} />
            <Route path="/detailsUsers" component={CardUser} />
          </Switch>
        </Suspense>

      </div>
    </Router>
  );
}

export default App;
