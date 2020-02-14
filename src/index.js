import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import todosReducer from './store/reducers/todos';
import statusReducer from './store/reducers/status';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
    todos: todosReducer,
    status: statusReducer,
    auth: authReducer,
});

const logger = store => {
    return next => {
        return action => {
            // console.log('[Middleware] Dispatching', action);
            const result = next(action);
            // console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
