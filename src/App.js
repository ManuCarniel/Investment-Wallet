import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Stocks from './pages/Stocks';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/stocks" component={ Stocks } />
    </Switch>
  );
}

export default App;
