import React, {useContext} from 'react';
import classes from './TodoListItem.module.css';
import moment from "moment";
import listItemContext from "../../../../../context/listItem-context";


const TodoListItem  = (props) => {
    const date = props.item.due === null? '' : props.item.due.format('MMM D');
    const isOverdue = props.item.due === null || props.item.due === undefined || props.item.isDone? false: props.item.due.isSameOrBefore(moment(), 'day');
    const titleClasses = [classes.ItemTitle, props.item.isDone?classes.isDone:classes.isNotDone];

    const context = useContext(listItemContext);

    const boxCheckedHandler = (event) => {
        context.checkItem(props.item.id, event.target.checked)
    };

    return (
        <li className={classes.TodoListItem}>
            <div className={classes.ItemCheck}>
                <input
                    type='checkbox'
                    checked={props.item.isDone}
                    onChange={boxCheckedHandler}
                />
            </div>
            <div className={titleClasses.join(' ')}><span>{props.item.title}</span></div>
            <div className={[classes.ItemAddInfo, isOverdue? classes.overdue : classes.notdue].join(' ')}>{date}</div>
        </li>
    );
};

export default TodoListItem;