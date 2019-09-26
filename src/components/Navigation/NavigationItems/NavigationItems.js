import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) =>{
    let authLink=null;
    let orderLink=null;
    let burgerLink=null;
    if(props.isAuthenticated){
        authLink= <NavigationItem link="/logout">Log Out</NavigationItem>;
        orderLink=<NavigationItem link="/orders">Orders</NavigationItem>;
        burgerLink=<NavigationItem link="/burger">Burger Builder</NavigationItem>;
    }
    else{
        authLink=<NavigationItem link="/">Log In</NavigationItem>;
    }
    return(
            <div className={classes.NavigationItems}>
                {burgerLink}
                {orderLink}
                {authLink}
            </div>
    )
};

export default navigationItems;