import { push } from 'connected-react-router';
import * as actions from '../actions/auth';

export const initialState = {
    error: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
    case actions.CLASSIC_SIGN_IN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        push('/');
        return {
            ...state,
        };

    case actions.CLASSIC_SIGN_IN_FAILURE:
        return {
            ...state,
            error: action.payload.error,
        };

    case actions.CLASSIC_SIGN_UP_SUCCESS:
        push('/login');
        return {
            ...state,
        };

    case actions.CLASSIC_SIGN_UP_FAILURE:
        push('/signup');
        return {
            ...state,
            error: action.payload.error,
        };


    case actions.UNAUTHENTICATED_USER_ERROR:
        push('/login');
        return {
            ...state,
            error: action.payload.error,
        };

    default:
        return state;
    }
}
