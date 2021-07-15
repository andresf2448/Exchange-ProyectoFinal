import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login } from "components/login/login";
import { Register } from "components/register/register";
import { Home } from "containers/home/home";
import { RecoverPassword } from "components/recoverPassword/recoverPassword";
import Faq from 'components/faq/faq'

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />  
        <Route path="/home" component={Home} />
        <Route path="/recoverPassword" component={RecoverPassword} />
        <Route path='/faq' component={Faq}/>
      </div>
    </Router>  
  );
}

export default App;
