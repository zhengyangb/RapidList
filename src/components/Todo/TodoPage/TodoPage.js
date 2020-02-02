import React, {Component} from 'react';
import './TodoPage.css';
import TodoList from "./TodoList/TodoList";
import TodoAddBox from "./TodoAddBox/TodoAddBox";

class TodoPage extends Component {
    render() {
        return (
            <div className="Page">
                <TodoAddBox addItem={this.props.addItem}/>
                <TodoList todos={this.props.todos}/>
            </div>
        );
    }
}

export default TodoPage;