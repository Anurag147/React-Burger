import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{

    state = {
        ShowSideDrawer:false
    }
    sideDrawerCloseHandler = () => {
        this.setState({
            ShowSideDrawer:false
        });
    }
    sideDrawerToggleHandler = () => {
        this.setState((prvState)=>{
            return this.state.ShowSideDrawer=!prvState.ShowSideDrawer
        });
    }
    render(){
        return(
            <Auxiliary> 
                <Toolbar isAuth = {this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth = {this.props.isAuthenticated} open={this.state.ShowSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary> 
        )
    };
} 

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
} 
export default connect(mapStateToProps)(Layout);