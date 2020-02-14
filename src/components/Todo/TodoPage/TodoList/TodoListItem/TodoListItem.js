import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../../../../store/action';
import classes from './TodoListItem.module.css';
import moment from "moment";
// import listItemContext from "../../../../../context/listItem-context";


const TodoListItem  = (props) => {
    const dateObject = props.item.due ? moment(props.item.due) : null;
    const date = dateObject ? dateObject.format('MMM D'):null;
    const isOverdue = dateObject && !props.item.isDone ? dateObject.isSameOrBefore(moment(), 'day') : false ;
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
                    onChange={props.boxCheckedHandler}
                />
            </div>
            <div
                className={titleClasses.join(' ')}
                onClick={props.boxCheckedHandler}
            ><span>{props.item.title}</span></div>
            <div className={[classes.ItemAddInfo, isOverdue? classes.overdue : classes.notdue].join(' ')}>{date}</div>
        </li>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        boxCheckedHandler: () => dispatch(actionCreators.checkboxAndUpdateTodoItems(ownProps))
    }
};

export default connect(null, mapDispatchToProps)(TodoListItem);