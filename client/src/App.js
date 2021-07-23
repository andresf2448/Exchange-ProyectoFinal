import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from 'containers/landing/landing';
import { Login } from "components/login/login";
import { Register } from "components/register/register";
import { Home } from "containers/home/home";
import { RecoverPassword } from "components/recoverPassword/recoverPassword";
import CheckoutForm from "components/stripe/checkoutForm";
import Faq from "components/faq/faq";
import { About } from "components/about/about";
import RestorePassword from "components/restorePassword/restorePassword";
import Toml from "containers/toml/toml";
import ClaimableBalance from "components/claimableBalance/claimableBalance";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/landing" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/recoverPassword" component={RecoverPassword} />
        <Route path="/payment" component={CheckoutForm} />
        <Route path='/faq' component={Faq}/>
        <Route path='/about' component={About}/>
        <Route path="/restorePassword" component={RestorePassword} />
        <Route path="/.well-known/stellar.toml" component={Toml} />
        <Route path="/claimableBalance" component={ClaimableBalance}/>
      </div>
    </Router>
  );
}

export default App;
