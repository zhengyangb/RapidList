import React, {Component} from 'react';
import TodoPage from '../../components/Todo/TodoPage/TodoPage';
import Summary from "../../components/Summary/Summary";

import listItemContext from "../../context/listItem-context";

import moment from "moment";
import {Redirect, Route, Switch} from "react-router";

class TodoControl extends Component{
    idCount = 4;
    state = {
        todos : [
            {id: 0, title: "Buy some 🥛", isDone: false, due: moment(new Date(2020, 3, 10))},
            {id: 1, title: "Run 🏃 a 5K‍", isDone: true, due: moment(new Date(2020, 0, 10))},
            {id: 2, title: "Watch 🎬", isDone: true, due: null},
            {id: 3, title: "Spend a day in a 🏞", isDone: false, due: moment()}
        ],

    };

    // addItemHandler = (item) => {
    //     const itemToAdd = {...item};
    //     itemToAdd.isDone = false;
    //     itemToAdd.id = this.idCount++;
    //     const todosNew = [...this.state.todos];
    //     todosNew.push(itemToAdd);
    //     this.setState({todos: todosNew});
    // };

    // checkItemHandler = (id, done) => {
    //     this.setState(prevState => {
    //         return {todos: prevState.todos.map(todo=>{
    //             if (todo.id === id){
    //                 todo.isDone = done;
    //                 return todo;
    //             }
    //             else{
    //                 return todo;
    //             }
    //         })
    //     }});
    // };


    render() {
        const contextValue = {
            // addItem: this.addItemHandler,
            // checkItem: this.checkItemHandler,
            todos: this.state.todos
        };
        return (
            <div>
                <Switch>

                    <listItemContext.Provider value={contextValue}>
                    <Route path='/all/' render={(props) => (
                        <TodoPage
                            {...props}
                        />
                    )}/>

                    <Route path='/today/' render={(props) => (
                        <TodoPage
                            {...props}
                        />
                    )}/>



                    <Route path='/summary/' render={(props) => (<Summary {...props}/>)}/>

                    <Route path='/' exact>
                        <Redirect to='/all/' />
                    </Route>
                    </listItemContext.Provider>
                </Switch>

            </div>
        );
    }
}

export default TodoControl;