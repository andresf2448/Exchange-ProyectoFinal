import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import {Home} from './containers/home/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path='/home' component={Home}/>
      </div>
    </Router>
  );
}

export default App;
