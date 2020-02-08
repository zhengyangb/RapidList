import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../../../store/action';
import classes from './TodoAddBox.module.css';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Dropdown from '../../../UI/Dropdown/Dropdown';
import Calendar from "../../../../container/Calendar/Calendar";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
// import moment from "moment";

const TodoAddBox = (props) => {

    useEffect(()=> {setDueDate(props.defaultDueDate)}, [props.defaultDueDate])

    const [title, setTitle] = useState('');
    const [canAddItem, setCanAddItem] = useState(false);
    const [dropdownDisplay, setDropDownDisplay] = useState(false);
    const [dueDate, setDueDate] = useState(props.defaultDueDate);

    const titleChangedHandler = event => {
        setTitle(event.target.value);
        setCanAddItem((event.target.value === '') ? false : true);
    };

    const inputRef = useRef(null);

    const addButtonClickedHandler = () => {
        if (!canAddItem){
            return;
        }
        const todoItem = {
            title: title,
            due: dueDate,
        };
        props.addItem(todoItem);
        setTitle('');
        setCanAddItem(false);
        setDueDate(props.defaultDueDate);
        //reset time also
    };

    const inputBoxKeyUpHandler = (event) => {
        if (!canAddItem){
            return;
        }
        if (event.key === 'Enter'){
            addButtonClickedHandler();
        }
    };

    const toggleDropdownDisplay = () => {
        setDropDownDisplay(display=>(!display));
    };

    const removeDueDateHandler = () =>{
        setDropDownDisplay(false);
        setDueDate(null);
        inputRef.current.focus();
    };

    const daySelectedHandler = (momentObject) => {
        setDueDate(momentObject.clone());
        setDropDownDisplay(false);
        inputRef.current.focus();
    };



    return (
        <div className={classes.AddBox}>
            <div className={classes.inputDiv}>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Add a new item"
                    value={title}
                    onChange={titleChangedHandler}
                    onKeyUp={inputBoxKeyUpHandler}
                />
                <div className={classes.addInfo}>
                    {dueDate ? dueDate.format('MMM D') : null}
                </div>
            </div>

            <div className={classes.buttonDiv}>
                <div style={{height: '2em'}}>
                    <button className={[classes.barButton, classes.buttonDate].join(' ')} onClick={toggleDropdownDisplay}>
                        <FontAwesomeIcon icon={faCalendarAlt} color={dueDate === null ? 'black' : '#2E6989'}/>
                    </button>
                </div>
                <Dropdown display={dropdownDisplay}>
                    <Calendar
                        dateSelected={dueDate}
                        toggleCal={toggleDropdownDisplay}
                        removeDueDate={removeDueDateHandler}
                        selectDate={daySelectedHandler}
                    />
                </Dropdown>
            </div>

            <div className={classes.buttonDiv}>
                <button
                    className={[classes.barButton, classes.buttonAdd].join(' ')}
                    onClick={addButtonClickedHandler}
                    disabled={!canAddItem}
                ><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (item) => dispatch({
            type: actionTypes.ADD_ITEM,
            newItem: item
        })
    }
}

export default connect(null, mapDispatchToProps)(TodoAddBox);