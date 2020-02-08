import React from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../../../../store/action';
import classes from './TodoListItem.module.css';
import moment from "moment";
import listItemContext from "../../../../../context/listItem-context";


const TodoListItem  = (props) => {
    const date = props.item.due === null? '' : props.item.due.format('MMM D');
    const isOverdue = props.item.due === null || props.item.due === undefined || props.item.isDone? false: props.item.due.isSameOrBefore(moment(), 'day');
    const titleClasses = [classes.ItemTitle, props.item.isDone?classes.isDone:classes.isNotDone];

    // We replaced Context with Redux
    // const context = useContext(listItemContext);
    // const boxCheckedHandler = (event) => {
    //     context.checkItem(props.item.id, event.target.checked)
    // };

    return (
        <li className={classes.TodoListItem}>
            <div className={classes.ItemCheck}>
                <input
                    type='checkbox'
                    checked={props.item.isDone}
                    onChange={(event) => props.boxCheckedHandler(event, props.item.id)}
                />
            </div>
            <div className={titleClasses.join(' ')}><span>{props.item.title}</span></div>
            <div className={[classes.ItemAddInfo, isOverdue? classes.overdue : classes.notdue].join(' ')}>{date}</div>
        </li>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        boxCheckedHandler: (event, id)=> dispatch({
            type: actionTypes.CHECKBOX,
            id: id,
            checked: event.target.checked,
        })
    }
};

export default connect(null, mapDispatchToProps)(TodoListItem);