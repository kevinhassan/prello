import * as actions from '../actions/auth';

/**
 * Parse the content of the JWToken
 */
export const parseJwtToId = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64)).id;
    } catch (e) {
        return null;
    }
};

export const getToken = () => {
    try {
        const token = localStorage.getItem('prello_token');
        return token;
    } catch (e) {
        // The next comment ignore the return null in jest code coverage
        // (don't know how to test an error on localStorage.getItem())
        /* istanbul ignore next */
        return null;
    }
};

export const initialState = {
    errorSignInMessage: '',
    errorRegisterMessage: '',
    isLoggedIn: getToken() !== null,
    clientId: parseJwtToId(getToken()),
};

export default function authReducer(state = initialState, action) {
    if (action) {
        switch (action.type) {
        case actions.GITHUB_SIGN_IN_SUCCESS:
        case actions.CLASSIC_SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                errorSignInMessage: '',
                clientId: action.payload.clientId,
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
