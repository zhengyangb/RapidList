import React from 'react';
import classes from './Dropdown.module.css';

const Dropdown = (props) => {
    return (
        <div className={[classes.Dropdown, props.display ? classes.Show : classes.Hide].join(' ')}>
            {props.display ? props.children : null}
        </div>
    )
};

export default Dropdown;