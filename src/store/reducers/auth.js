import * as actionTypes from '../action';

const initState = {
    token: null,
    email: null,
    userId: null,
    error: null,
    loading: false,
};

const reducer = (state=initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_STARTED:
            return {...state,
                error: null,
                loading: true,
            };
        case actionTypes.AUTH_FAILED:
            return {...state,
                error: action.error,
                loading: false,
            };
        case actionTypes.AUTH_SUCCEEDED:
            return {...state,
                token: action.authData.idToken,
                email: action.authData.email,
                userId: action.authData.localId,
                error: null,
                loading: false,
            };
        case actionTypes.AUTH_LOGOUT:
            return {...state,
                token: null,
                email: null,
                userId: null,
            };
        default:
            return state;
    }
};

export default reducer;