import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login } from "components/login/login";
import { Register } from "components/register/register";
import { Home } from "containers/home/home";
import { Settings } from "containers/settings/settings";
import { HomeGrid } from "containers/homeGrid/homeGrid";
import { Wallet } from "components/wallet/wallet";
import { About } from "components/about/about";
import { Balance } from "components/balance/balance";
import { Exchanges } from "components/exchanges/exchanges";
import { RecoverPassword } from "components/recoverPassword/recoverPassword";
import { LoadingProfile } from "components/loadingProfile/LoadingProfile";
import { TransactionsHistory } from "components/transactionsHistory/transactionsHistory";
import { Deposit } from "components/deposit/deposit";
import { Withdraw } from "components/withdraw/withdraw";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/home/home" component={HomeGrid} />
        <Route path="/home/settings" component={Settings} />
        <Route path="/home/settings/profile" component={LoadingProfile} />
        <Route path="/home/settings/history" component={TransactionsHistory} />
        <Route path="/home/settings/deposit" component={Deposit} />
        <Route path="/home/settings/withdraw" component={Withdraw} />
        <Route path="/home/wallet" component={Wallet} />
        <Route path="/home/about" component={About} />
        <Route path="/home/balance" component={Balance} />
        <Route path="/home/exchanges" component={Exchanges} />
        <Route path="/recoverPassword" component={RecoverPassword} />
      </div>
    </Router>
  );
}

export default App;
