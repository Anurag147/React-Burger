import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) =>{
 return(
     <header className={classes.Toolbar}>
         <DrawerToggle clicked={props.drawerToggleClicked}/>
         <div style={{height:"80%"}}>
           <Logo />
         </div>
         
         <div>
             <nav className={classes.DesktopOnly}>
                 <NavigationItems></NavigationItems>
             </nav>
         </div>
     </header>
 );
};

export default toolbar;