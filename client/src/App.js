import { Login } from "components/login/login";
import { Register } from "components/register/register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import { Home } from "containers/home/home";
import { RecoverPassword } from "components/recoverPassword/recoverPassword";


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/recoverPassword" component={RecoverPassword} />
      </div>
    </Router>
  );
}

export default App;
