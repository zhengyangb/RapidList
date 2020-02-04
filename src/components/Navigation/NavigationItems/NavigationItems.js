import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/all/'>All items</NavigationItem>
        <NavigationItem link='/today/'>Today</NavigationItem>
        <NavigationItem link='/Summary/'>Summary</NavigationItem>
    </ul>
);

export default navigationItems;