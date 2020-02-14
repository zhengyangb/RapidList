import axios from '../axios-todos';
import axiosStock from 'axios';
import {API_key} from "../key";

export const CHECKBOX = 'CHECKBOX';
export const ADD_ITEM = 'ADD_ITEM';
export const SET_TODO_ITEMS = 'SET_TODO_ITEMS';
export const FETCH_TODO_FAILED = 'FETCH_TODO_FAILED';
export const FETCH_TODO_SUCCEEDED = 'FETCH_TODO_SUCCEEDED';
export const UPLOAD_TODO_STARTED = 'UPLOAD_TODO_STARTED';
export const UPLOAD_TODO_FAILED = 'UPLOAD_TODO_FAILED';
export const UPLOAD_TODO_SUCCEEDED = 'UPLOAD_TODO_SUCCEEDED';

export const AUTH_STARTED = 'AUTH_STARTED';
export const AUTH_FAILED = 'AUTH_FAILED';
export const AUTH_SUCCEEDED = 'AUTH_SUCCEEDED';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        newItem: item,
    }
};

export const checkbox = (ownProps) => {
    return {
        type: CHECKBOX,
        id: ownProps.item.id,
    }
};

export const setTodoItems = (todos) => {
    return {
        type: SET_TODO_ITEMS,
        todos: todos
    }
};



export const fetchTodoSucceeded = () => {
    return {
        type: FETCH_TODO_SUCCEEDED,
    }
};

export const fetchTodoFailed = () => {
    return {
        type: FETCH_TODO_FAILED,
    }
};

export const uploadTodoStarted = () =>{
    return{
        type:UPLOAD_TODO_STARTED,
    }
};

export const uploadTodoFailed = () => {
    return {
        type: UPLOAD_TODO_FAILED,
    }
};

export const uploadTodoSucceeded = () => {
    return {
        type: UPLOAD_TODO_SUCCEEDED,
    }
};


export const initTodoItems = () => {
    return dispatch => {
        //TODO: fetchTodoStarted to set loading to true
        axios.get('test_data.json')
            .then(response => {
                dispatch(setTodoItems(response.data));
                dispatch(fetchTodoSucceeded());
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchTodoFailed())
            })
    };
};

// TODO: write a wrapper for update actions

export const addAndUpdateTodoItems = (todos) => {
    return (dispatch, getState) => {
        dispatch(addItem(todos));
        axios.put('test_data.json', getState().todos)
            .then(response=>{
                console.log('Update successful!')
            })
            .catch()
    }
};

export const checkboxAndUpdateTodoItems = (ownProps) => {
    return (dispatch, getState) => {
        dispatch(checkbox(ownProps));
        dispatch(uploadTodoStarted());
        axios.put('test_data.json', getState().todos)
            .then(response=>{
                console.log('Update successful!')
                dispatch(uploadTodoSucceeded())
            })
            .catch(error => {
                dispatch(uploadTodoFailed())
            })
    }
};

export const authStarted = () => {
    return{
        type: AUTH_STARTED,
    }
};

export const authFailed = (error) => {
    return {
        type: AUTH_FAILED,
        error: error.response.data.error
    }
};

export const authSucceeded = (authData) => {
    return {
        type: AUTH_SUCCEEDED,
        authData: authData
    }
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    return {
        type: AUTH_LOGOUT,
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000)
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStarted());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_key;
        if (!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_key;
        }
        axiosStock.post(url, authData)
            .then(response => {
                console.log(response);
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email', response.data.email);
                dispatch(authSucceeded(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFailed(error))
            })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logout());
        }
        else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime > new Date()){
                dispatch(authSucceeded({
                    idToken: token,
                    email: localStorage.getItem('email'),
                    localId: localStorage.getItem('userId'),
                }));
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
            }
            else{
                dispatch(logout());
            }

        }
    }
};
