import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './store/action';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import TodoControl from './container/TodoControl/TodoControl';


class App extends Component{
    componentDidMount() {
        this.props.authCheckState();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Layout>
                        <TodoControl/>
                    </Layout>
                </div>
            </BrowserRouter>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authCheckState: () => dispatch(actions.authCheckState())
    }
};

export default connect(null, mapDispatchToProps)(App);
