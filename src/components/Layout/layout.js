import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.ShowSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary> 
        )
    };
} 

export default Layout;