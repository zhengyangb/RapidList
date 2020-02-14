import * as actionTypes from '../action';

const initState = {
    loadError: false,
    loading: true,
    uploading: false,
    token: null,
    userId: null,
    loginError: null,
    loginLoading: false,
};

const reducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TODO_FAILED:
            return {...state,
                error: true
            };
        case actionTypes.FETCH_TODO_SUCCEEDED:
            return {...state,
                error: false,
                loading: false,
            };
        case actionTypes.UPLOAD_TODO_STARTED:
            return {...state,
                uploading: true,
            };
        case actionTypes.UPLOAD_TODO_FAILED:
            return {...state,
                uploading: false,
                error: false
            };
        case actionTypes.UPLOAD_TODO_SUCCEEDED:
            return {...state,
                uploading: false,
                error: false
            };
        default:
            return state;
    }
};

export default reducer;