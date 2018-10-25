import * as actions from '../actions/auth';

export const initialState = {
    token: undefined,
    error: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
    case actions.CLASSIC_SIGN_IN_SUCCESS:
        return {
            ...state,
            token: action.payload.token,
        };

    case actions.CLASSIC_SIGN_IN_FAILURE:
        return {
            ...state,
            error: action.payload.error,
        };

    default:
        return state;
    }
}
