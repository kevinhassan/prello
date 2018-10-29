import { push } from 'connected-react-router';
import * as actions from '../actions/auth';

export const initialState = {
    error: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
    case actions.CLASSIC_SIGN_IN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
        };

    case actions.CLASSIC_SIGN_IN_FAILURE:
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
