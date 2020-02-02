import React, {useState} from 'react';
import classes from './TodoAddBox.module.css';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Dropdown from '../../../UI/Dropdown/Dropdown';
import Calendar from "../../../../container/Calendar/Calendar";
import moment from "moment";

const TodoAddBox = (props) => {
    const [title, setTitle] = useState('');
    const [canAddItem, setCanAddItem] = useState(false);
    const [dropdownDisplay, setDropDownDisplay] = useState(true);
    const [dueDate, setDueDate] = useState(null);

    const titleChangedHandler = event => {
        setTitle(event.target.value);
        setCanAddItem((event.target.value === '') ? false : true);
    };

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
    };

    const daySelectedHandler = (momentObject) => {
        setDueDate(momentObject.clone());
        setDropDownDisplay(false);
    }



    return (
        <div className={classes.AddBox}>
            <div className={classes.inputDiv}>
                <input
                    type="text"
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

export default TodoAddBox;