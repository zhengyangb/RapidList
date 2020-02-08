import React from 'react';
import {connect} from "react-redux";
import './TodoList.css';
import TodoListItem from './TodoListItem/TodoListItem';

const TodoList = (props) => {
    const todoListItems = props.todos.filter(props.filter).map(item=>(<TodoListItem item={item} key={item.id}/>))
    return (
        <ul className="TodoList">
            {todoListItems}
        </ul>
    )
};

const mapStateToProps = state => {
    return {
        todos: state.todos.items,
    }
};


export default connect(mapStateToProps)(TodoList);