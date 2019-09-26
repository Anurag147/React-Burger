import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from '../src/containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div>
          <Layout>
           <Switch>
           <Route path="/Logout" component={Logout}/>
            <Route path="/Checkout" component={Checkout}/>
            <Route path="/Orders" component={Orders}/>
            <Route path="/burger" component={BurgerBuilder}/>
            <Route path="/" component={Auth}/>
           </Switch>
           </Layout>    
      </div>
    );
  }
}

export default App;
