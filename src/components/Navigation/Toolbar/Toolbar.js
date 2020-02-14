import React from 'react';
import classes from './Toolbar.module.css';
import NavigationalItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawToggle/DrawToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggled} />
        <div>Rapid<strong>List</strong></div>
        <nav className={classes.DesktopOnly}>
            <NavigationalItems isAuth={props.isAuth} email={props.email}/>
        </nav>
    </header>
);

export default toolbar;