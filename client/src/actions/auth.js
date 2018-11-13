import { push } from 'connected-react-router';
import * as APIFetch from '../helpers/APIFetch';
import {
    displayLoadingModal, hideLoadingModal, displaySuccessMessage, displayErrorMessage,
} from './modal';

// ===== Classic sign in ===== //
export const CLASSIC_SIGN_IN_STARTED = 'auth/CLASSIC_SIGN_IN_STARTED';
export const CLASSIC_SIGN_IN_FAILURE = 'auth/CLASSIC_SIGN_IN_FAILURE';
export const CLASSIC_SIGN_IN_SUCCESS = 'auth/CLASSIC_SIGN_IN_SUCCESS';

export const classicSignInStartedAction = () => ({ type: CLASSIC_SIGN_IN_STARTED });
export const classicSignInFailureAction = error => ({
    type: CLASSIC_SIGN_IN_FAILURE,
    payload: {
        error,
    },
});
export const classicSignInSuccessAction = clientId => ({
    type: CLASSIC_SIGN_IN_SUCCESS,
    payload: {
        clientId,
    },
});

export const classicSignIn = (email, password) => (dispatch) => {
    dispatch(displayLoadingModal());
    dispatch(classicSignInStartedAction());
    APIFetch.fetchPrelloAPI('login', { email, password }, APIFetch.POST)
        .then((res) => {
            localStorage.setItem('prello_token', res.data.token);
            dispatch(displaySuccessMessage(res.data.message));
            dispatch(classicSignInSuccessAction(res.data.userId));
        })
        .catch((error) => {
            dispatch(displayErrorMessage(error.response.data.error));
            dispatch(classicSignInFailureAction(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Github sign in ===== //
export const GITHUB_SIGN_IN_STARTED = 'auth/GITHUB_SIGN_IN_STARTED';
export const GITHUB_SIGN_IN_FAILURE = 'auth/GITHUB_SIGN_IN_FAILURE';
export const GITHUB_SIGN_IN_SUCCESS = 'auth/GITHUB_SIGN_IN_SUCCESS';

export const githubSignInStartedAction = () => ({ type: GITHUB_SIGN_IN_STARTED });
export const githubSignInFailureAction = () => ({ type: GITHUB_SIGN_IN_FAILURE });
export const githubSignInSuccessAction = clientId => ({
    type: GITHUB_SIGN_IN_SUCCESS,
    payload: {
        clientId,
    },
});

export const githubSignIn = data => (dispatch) => {
    dispatch(displayLoadingModal());
    dispatch(githubSignInStartedAction());
    if (data.token && data.token !== '' && data.clientId && data.clientId !== '') {
        dispatch(githubSignInSuccessAction(data.clientId));
        localStorage.setItem('prello_token', data.token);
        dispatch(push('/boards'));
    } else {
        dispatch(githubSignInFailureAction());
    }
    dispatch(hideLoadingModal());
};


// ===== Classic Register ===== //
export const CLASSIC_REGISTER_STARTED = 'auth/CLASSIC_REGISTER_STARTED';
export const CLASSIC_REGISTER_FAILURE = 'auth/CLASSIC_REGISTER_FAILURE';
export const CLASSIC_REGISTER_SUCCESS = 'auth/CLASSIC_REGISTER_SUCCESS';

export const classicRegisterStartedAction = () => ({ type: CLASSIC_REGISTER_STARTED });

export const classicRegisterFailureAction = error => ({
    type: CLASSIC_REGISTER_FAILURE,
    payload: {
        error,
    },
});
export const classicRegisterSuccessAction = () => ({ type: CLASSIC_REGISTER_SUCCESS });

export const classicRegister = (fullName, email, password) => (dispatch) => {
    dispatch(classicRegisterStartedAction());
    APIFetch.fetchPrelloAPI('register', {
        fullName,
        email,
        password,
    }, APIFetch.POST)
        .then(() => {
            dispatch(classicRegisterSuccessAction());
            dispatch(displaySuccessMessage('You have been successfully registered!'));
            dispatch(push('/signin'));
        })
        .catch((error) => {
            dispatch(classicRegisterFailureAction(error.response.data.error));
        });
};

// ===== Sign out ===== //
export const SIGN_OUT = 'auth/SIGN_OUT';

export const signOutAction = () => ({ type: SIGN_OUT });

export const signOut = () => (dispatch) => {
    localStorage.removeItem('prello_token');
    dispatch(signOutAction());
};
