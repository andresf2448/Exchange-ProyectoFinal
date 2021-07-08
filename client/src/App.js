import { Login } from 'components/login/login';
import { Register } from 'components/register/register';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import {Home} from 'containers/home/home';
import {Settings} from 'containers/settings/settings'
import { HomeGrid } from 'containers/homeGrid/homeGrid';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/home' component={Home}/>
        <Route path='/home/home' component={HomeGrid}/>
        <Route path='/home/settings' component={Settings}/>

      </div>
    </Router>
  );
}

export default App;
