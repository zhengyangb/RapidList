import React from 'react';
import classes from './Button.module.css'

const Button = (props) => {
    return (
        <button
            className={[classes.Button, props.btnType? classes[props.btnType]: classes.default].join(' ')}
            onClick={props.clicked}
        >{props.children}</button>
    );
};

export default Button;
