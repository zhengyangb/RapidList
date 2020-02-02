import React from 'react';
import classes from './Toolbar.module.css';
import NavigationalItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawToggle/DrawToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggled} />
        <div>Logo</div>
        <nav className={classes.DesktopOnly}>
            <NavigationalItems/>
        </nav>
    </header>
);

export default toolbar;