import React, {Component} from 'react';
import {connect} from 'react-redux';
import './TodoPage.css';
import TodoList from "./TodoList/TodoList";
import TodoAddBox from "./TodoAddBox/TodoAddBox";
import Spinner from '../../UI/Spinner/Spinner';
import Error from '../../UI/Error/Error';

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
        '/today/': (item) => (item.due && moment(item.due).isSame(moment(), 'day'))
    };
    defaultDueDate = {
        '/all/': null,
        '/today/': moment(),
    };

    render() {
        const titleDisplay = this.title[this.props.match.path];
        const defaultDueDatePassing = this.defaultDueDate[this.props.match.path];

        let content = <Spinner/>;
        if (this.props.error){
            content = <Error/>;
        }
        else if (!this.props.loading){
            content = (
                <React.Fragment>
                    <TodoAddBox defaultDueDate={defaultDueDatePassing}/>
                    <TodoList filter={this.filter[this.props.match.path]}/>
                </React.Fragment>
            )
        }


        return (
            <div className="OuterBox">
                {titleDisplay}
                <div className="Page">
                    {content}
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.status.error,
        loading: state.status.loading,
    }
}

export default connect(mapStateToProps)(TodoPage);