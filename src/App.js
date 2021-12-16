import { Route, Switch } from 'react-router';
import ErrorPage from './component/Error/ErrorPage';
import Home from './component/Home/home';
import Login from './component/Login/login';
import Provider from './component/provider/Provider';

function App() {
   return (
      <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/login" component={Login} />
         <Route path="/provider" component={Provider} />
         <Route component={ErrorPage} />
      </Switch>
   );
}

export default App;
