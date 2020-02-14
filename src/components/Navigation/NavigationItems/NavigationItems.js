import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

const navigationItems = (props) => {
    let logInDisplay = "Log In";
    if (props.isAuth){
        let usr = props.email.slice(0, props.email.indexOf('@'));
        if (usr.length > 5){
            usr = usr.slice(0, 5) + '...';
        }
        logInDisplay = (
            <React.Fragment>
                <FontAwesomeIcon icon={faUserCircle} color="#C2C2C2"/>
                &nbsp;
                {usr}
            </React.Fragment>
        )
    }


    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/all/'>All items</NavigationItem>
            <NavigationItem link='/today/'>Today</NavigationItem>
            <NavigationItem link='/summary/'>Summary</NavigationItem>
            <NavigationItem link='/login/'>{logInDisplay}</NavigationItem>
        </ul>
    )
};


export default navigationItems;