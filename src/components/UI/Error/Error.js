import React from 'react';
import './Error.css';

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const error = () => {
    return (
        <div className="Error">
            <FontAwesomeIcon icon={faTimes} color="#C2C2C2" size="3x"/>
            <div>Error happened. </div>
        </div>
    );
};

export default error;
