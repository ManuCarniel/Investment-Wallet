import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Stocks from './pages/Stocks';
import StocksDetails from './pages/StocksDetails';
import Wallet from './pages/Wallet';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/stocks" component={ Stocks } />
      <Route exact path="/wallet" component={ Wallet } />
      <Route exact path="/stocks/:ticker"
        component={ StocksDetails }
      />
    </Switch>
  );
}

export default App;
