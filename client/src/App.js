import { Login } from 'components/login/login';
import { Register } from 'components/register/register';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import {Home} from './containers/home/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/home' component={Home}/>
      </div>
    </Router>
  );
}

export default App;
