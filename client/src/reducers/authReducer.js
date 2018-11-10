import * as actions from '../actions/auth';

export const initialState = {
    errorSignInMessage: '',
    errorRegisterMessage: '',
    isLoggedIn: localStorage.getItem('prello_token') !== null,
};

export default function authReducer(state = initialState, action) {
    if (action) {
        switch (action.type) {
        case actions.CLASSIC_SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                errorSignInMessage: '',
            };

        case actions.CLASSIC_SIGN_IN_FAILURE:
            return {
                ...state,
                errorSignInMessage: action.payload.error,
            };

        case actions.CLASSIC_REGISTER_SUCCESS:
            return {
                ...state,
                errorRegisterMessage: '',
            };

        case actions.CLASSIC_REGISTER_FAILURE:
            return {
                ...state,
                errorRegisterMessage: action.payload.error,
            };

        case actions.SIGN_OUT:
            return {
                ...state,
                isLoggedIn: false,
            };

        default:
            return state;
        }
    }
    return state;
}
