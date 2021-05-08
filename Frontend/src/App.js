import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import CompanyScreen from './screens/CompanyScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import StocksScreen from './screens/StocksScreen';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <Router >
        <Switch >
          <Route path="/Stocks">      <StocksScreen />    </Route>
          <Route path="/Dashboard">   <HomeScreen />      </Route>
          <Route path="/Company">     <CompanyScreen />   </Route>
          <Route path="/" exact>      <SplashScreen />    </Route> 
        </Switch>
      </Router>
    );
  }
}

export default App;
