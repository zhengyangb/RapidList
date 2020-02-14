import React from 'react';
import {connect} from 'react-redux';
import classes from './Summary.module.css';
import CountUp from "react-countup";
// import listItemContext from "../../context/listItem-context";

// import moment from "moment";
import {faClipboardCheck} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Summary = (props) => {
    // const context = useContext(listItemContext);
    let todoDoneNum = props.todos.map(todo=>(+todo.isDone)).reduce((a, b)=>(a+b), 0);
    let todoNum = props.todos.length === 0 ? 0 : props.todos.length;

    return (
        <div className={classes.OuterBox}>
            <h2><FontAwesomeIcon icon={faClipboardCheck}/> Summary</h2>
            <div className={classes.summaryRow}>
                <div className={classes.summaryNumber}><CountUp end={todoDoneNum/todoNum * 100} suffix="%"/></div>
                <div className={classes.summaryText}>You have finished {Math.round(todoDoneNum/todoNum * 100)}% of all tasks.</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        todos: state.todos.items,
    }
};

export default connect(mapStateToProps)(Summary);