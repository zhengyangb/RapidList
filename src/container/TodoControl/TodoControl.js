import React, {Component} from 'react';
import TodoPage from '../../components/Todo/TodoPage/TodoPage';

class TodoControl extends Component{
    idCount = 4;
    state = {
        todos : [
            {id: 0, title: "drink milk test", isDone: false, due: new Date(2020, 0, 10)},
            {id: 1, title: "exercise test", isDone: true, due: new Date(2020, 2, 10)},
            {id: 2, title: "watch movie test", isDone: true, due: null},
            {id: 3, title: "go to park test", isDone: true, due: new Date(2019, 9, 1)}
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
                <h2>All items</h2>
                <TodoPage
                    todos={this.state.todos}
                    addItem={this.addItemHandler}
                />
            </div>
        );
    }
}

export default TodoControl;