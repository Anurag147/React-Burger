import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) =>{
    return(
            <div className={classes.NavigationItems}>
                <NavigationItem link="/">Burger Builder</NavigationItem>
                <NavigationItem link="/orders">Orders</NavigationItem>
            </div>
    )
};

export default navigationItems;