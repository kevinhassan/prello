
import { displayLoadingModal, hideLoadingModal } from './modal';

export const CLASSIC_SIGN_IN_STARTED = 'auth/CLASSIC_SIGN_IN_STARTED';
export const CLASSIC_SIGN_IN_FAILURE = 'auth/CLASSIC_SIGN_IN_FAILURE';
export const CLASSIC_SIGN_IN_SUCCESS = 'auth/CLASSIC_SIGN_IN_SUCCESS';

export const CLASSIC_REGISTER_STARTED = 'auth/CLASSIC_REGISTER_STARTED';
export const CLASSIC_REGISTER_FAILURE = 'auth/CLASSIC_REGISTER_FAILURE';
export const CLASSIC_REGISTER_SUCCESS = 'auth/CLASSIC_REGISTER_SUCCESS';

export const UNAUTHENTICATED_USER_ERROR = 'auth/UNAUTHENTICATED_USER_ERROR';

// ==========

export const classicSignInStarted = () => ({ type: CLASSIC_SIGN_IN_STARTED });
export const classicSignInFailure = error => ({
    type: CLASSIC_SIGN_IN_FAILURE,
    payload: {
        error,
    },
});
export const classicSignInSuccess = token => ({
    type: CLASSIC_SIGN_IN_SUCCESS,
    payload: {
        token,
    },
});

export const classicSignIn = (email, password) => (dispatch) => {
    dispatch(displayLoadingModal());
    dispatch(classicSignInStarted());
    APIFetch.fetchPrelloAPI('login', { email, password }, APIFetch.POST)
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            dispatch(classicSignInSuccess());
            dispatch(hideLoadingModal());
        })
        .catch((error) => {
            dispatch(classicSignInFailure(error.response.data.error));
            dispatch(hideLoadingModal());
        });
};

export const classicRegisterStarted = () => ({ type: CLASSIC_REGISTER_STARTED });

export const classicRegisterFailure = error => ({
    type: CLASSIC_REGISTER_FAILURE,
    payload: {
        error,
    },
});
export const classicRegisterSuccess = () => ({ type: CLASSIC_REGISTER_SUCCESS });


export const classicSignUp = (name, fullname, email, password) => (dispatch) => {
    dispatch(classicSignUpStarted());
export const classicSignUp = (name, fullName, email, password) => (dispatch) => {
    dispatch(classicSignUpStarted());
    APIFetch.fetchPrelloAPI('register', {
        name, fullname, email, password,
        name, fullName, email, password,
    }, APIFetch.POST)
        .then((res) => {
            dispatch(classicRegisterSuccess());
        })
        .catch((error) => {
            dispatch(classicRegisterFailure(error.response.data.error));
        });
};

export const UnauthenticatedUserError = error => ({
    type: UNAUTHENTICATED_USER_ERROR,
    payload: {
        error,
    },
});
