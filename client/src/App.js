import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {Home} from './containers/Home';

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
