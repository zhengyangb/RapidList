import React, {Component} from 'react';
import TodoPage from '../../components/Todo/TodoPage/TodoPage';
import Summary from "../../components/Summary/Summary";

import moment from "moment";
import {Redirect, Route, Switch} from "react-router";

class TodoControl extends Component{
    idCount = 4;
    state = {
        todos : [
            {id: 0, title: "drink milk test", isDone: false, due: moment(new Date(2020, 0, 10))},
            {id: 1, title: "exercise test", isDone: true, due: moment(new Date(2020, 2, 10))},
            {id: 2, title: "watch movie test", isDone: true, due: null},
            {id: 3, title: "go to park test", isDone: false, due: moment()}
        ],

    };

    addItemHandler = (item) => {
        const itemToAdd = {...item};
        itemToAdd.isDone = false;
        itemToAdd.id = this.idCount++;
        const todosNew = [...this.state.todos];
        todosNew.push(itemToAdd);
        this.setState({todos: todosNew});
    };


    render() {
        return (
            <div>
                <Switch>
                    <Route path='/all/' render={(props) => (
                        <TodoPage
                            {...props}
                            todos={this.state.todos}
                            addItem={this.addItemHandler}
                        />
                    )}/>

                    <Route path='/today/' render={(props) => (
                        <TodoPage
                            {...props}
                            todos={this.state.todos.filter(todo => todo.due && todo.due.isSame(moment(), 'day'))}
                            addItem={this.addItemHandler}
                        />
                    )}/>

                    <Route path='/summary' render={(props) => (<Summary {...props}/>)}/>

                    <Route path='/' exact>
                        <Redirect to='/all/' />
                    </Route>
                </Switch>

            </div>
        );
    }
}

export default TodoControl;