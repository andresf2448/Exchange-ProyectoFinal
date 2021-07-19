import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login } from "components/login/login";
import { Register } from "components/register/register";
import { Home } from "containers/home/home";
import { RecoverPassword } from "components/recoverPassword/recoverPassword";
import CheckoutForm from "components/stripe/checkoutForm";

import TradingView from "components/tradingView/tradingView";
import RestorePassword from "components/restorePassword/restorePassword";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/recoverPassword" component={RecoverPassword} />
        <Route path="/payment" component={CheckoutForm} />
        <Route path='/tv' component={TradingView}/>
        <Route path="/restorePassword" component={RestorePassword} />

      </div>
    </Router>
  );
}

export default App;
