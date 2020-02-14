import React from 'react';
import classes from './Input.module.css'

const Input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case('input'):
            inputElement = <input className={classes.InputElement}
                                  {...props.elementConfig}
                                  value={props.value}
                                  onChange={(event) => props.changed(event)}//TODO
            />;
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props}/>;
    }
    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    );
};

export default Input;
