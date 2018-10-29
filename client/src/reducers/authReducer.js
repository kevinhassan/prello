import * as actions from '../actions/auth';

export const initialState = {
    errorMessage: '',
    isLoggedIn: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
    case actions.CLASSIC_SIGN_IN_SUCCESS:
        return {
            ...state,
            isLoggedIn: true,
        };

    case actions.CLASSIC_SIGN_IN_FAILURE:
        return {
            ...state,
            errorMessage: action.payload.error,
        };

    case actions.CLASSIC_SIGN_UP_SUCCESS:
        return {
            ...state,
        };

    case actions.CLASSIC_SIGN_UP_FAILURE:
        return {
            ...state,
            errorMessage: action.payload.error,
        };


    case actions.UNAUTHENTICATED_USER_ERROR:
        return {
            ...state,
            errorMessage: action.payload.error,
        };

    default:
        return state;
    }
}
