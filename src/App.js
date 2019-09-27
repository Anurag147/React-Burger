import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from '../src/containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  //Below logic to dispatch an event which will check if user is logged in or not
  //This functionality is used so that if user refreshes the page the id tokens are not washed
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    //Check if user is authenticated. If user is not not authenticated guard all the authenticated routes
    let routes = null;
    if(this.props.isAuthenticated){
      routes = (
        <Layout>
          <Switch>
            <Route path="/Logout" component={Logout}/>
            <Route path="/Checkout" component={Checkout}/>
            <Route path="/Orders" component={Orders}/>
            <Route path="/burger" component={BurgerBuilder}/>
            <Route path="/" component={Auth}/>
          </Switch>
        </Layout>   
      );
    }
    else
    {
      routes = (
        <Layout>
          <Switch>
            <Route path="/Logout" component={Logout}/>
            <Route path="/" component={Auth}/>
          </Switch>
        </Layout>   
      );
    }
    return (
      <div>
          {routes}
      </div>
    );
  }
}

//Check if user is authenticated
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
    return{
        onTryAutoSignUp: () => {dispatch(actions.authCheckState())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
