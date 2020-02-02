import React from 'react';
import './TodoList.css';
import TodoListItem from './TodoListItem/TodoListItem';

const todoList = (props) => {
    const todoListItems = props.todos.map(item=>(<TodoListItem item={item} key={item.id}/>))
    return (
        <ul className="TodoList">
            {todoListItems}
        </ul>
    )
};

export default todoList;