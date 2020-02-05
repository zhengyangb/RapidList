import React, {Component} from 'react';
import classes from './Summary.module.css';
import CountUp from "react-countup";

import moment from "moment";
import {faClipboardCheck} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Summary extends Component {
    render() {
        return (
            <div className={classes.OuterBox}>
                <h2><FontAwesomeIcon icon={faClipboardCheck}/> Summary</h2>
                <div >

                </div>
                <CountUp end={1} suffix="%"/>

            </div>
        );
    }
}

export default Summary;