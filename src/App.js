import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import TodoControl from './container/TodoControl/TodoControl';

function App() {
    return (
        <div className="App">
            <Layout>
                <TodoControl/>
            </Layout>
        </div>
    );
}

export default App;
