import React, {Component} from 'react';
import './TodoPage.css';
import TodoList from "./TodoList/TodoList";
import TodoAddBox from "./TodoAddBox/TodoAddBox";

import moment from "moment";
import {faStream, faCalendarDay} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TodoPage extends Component {
    title = {
        '/all/': (<h2><FontAwesomeIcon icon={faStream}/> All items</h2>),
        '/today/': (<h2><FontAwesomeIcon icon={faCalendarDay}/> Today</h2>)
    };
    filter = {
        '/all/': (item)=>(true),
        '/today/': (item) => (item.due && item.due.isSame(moment(), 'day'))
    };
    defaultDueDate = {
        '/all/': null,
        '/today/': moment(),
    };

    render() {
        const titleDisplay = this.title[this.props.match.path];
        const defaultDueDatePassing = this.defaultDueDate[this.props.match.path];

        return (
            <div className="OuterBox">
                {titleDisplay}
                <div className="Page">
                    <TodoAddBox defaultDueDate={defaultDueDatePassing}/>
                    <TodoList filter={this.filter[this.props.match.path]}/>
                </div>
            </div>

        );
    }
}


export default TodoPage;