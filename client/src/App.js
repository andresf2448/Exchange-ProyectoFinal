import { Login } from 'components/login/login';
import { Register } from 'components/register/register';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import {Home} from 'containers/home/home';
import {Settings} from 'containers/settings/settings'
import { HomeGrid } from 'containers/homeGrid/homeGrid';
import { Wallet } from 'components/wallet/wallet';
import { About } from 'components/about/about';
import { Balance } from 'components/balance/balance';
import { Exchanges } from 'components/exchanges/exchanges';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/home' component={Home}/>
        <Route path='/home/home' component={HomeGrid}/>
        <Route path='/home/settings' component={Settings}/>
        <Route path='/home/wallet' component={Wallet}/>
        <Route path='/home/about' component={About}/>
        <Route path='/home/balance' component={Balance}/>
        <Route path='/home/exchanges' component={Exchanges}/>

      </div>
    </Router>
  );
}

export default App;
