import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import TodoControl from './container/TodoControl/TodoControl';

function App() {
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

export default App;
