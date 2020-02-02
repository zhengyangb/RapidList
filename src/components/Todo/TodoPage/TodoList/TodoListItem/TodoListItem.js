import React from 'react';
import classes from './TodoListItem.module.css';

const todoListItem  = (props) => {
    const date = props.item.due === null? '' : props.item.due.format('MMM D');
    const isOverdue = props.item.due === null || props.item.due === undefined || props.item.isDone? false: props.item.due <= Date.now();
    const titleClasses = [classes.ItemTitle, props.item.isDone?classes.isDone:classes.isNotDone];
    return (
        <li className={classes.TodoListItem}>
            <div className={classes.ItemCheck}><input type='checkbox' checked={props.item.isDone}/></div>
            <div className={titleClasses.join(' ')}><span>{props.item.title}</span></div>
            <div className={[classes.ItemAddInfo, isOverdue? classes.overdue : classes.notdue].join(' ')}>{date}</div>
        </li>
    );
};

export default todoListItem;