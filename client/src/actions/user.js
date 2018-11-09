import { push } from 'connected-react-router';
import * as APIFetch from '../helpers/APIFetch';
import {
    displayLoadingModal, hideLoadingModal, displayErrorMessage, displaySuccessMessage, displayErrorMessageAction,
} from './modal';

export const GET_USER_INFORMATION = 'user/GET_USER_INFORMATION';
export const USER_INFORMATION_SUCCESS = 'user/USER_INFORMATION_SUCCESS';

export const UPDATE_USER_INFORMATION = 'user/UPDATE_USER_INFORMATION';
export const UPDATE_USER_INFORMATION_SUCCESS = 'user/UPDATE_USER_INFORMATION_SUCCESS';


// ==========

export const userInformationSuccess = profile => ({
    type: USER_INFORMATION_SUCCESS,
    payload: {
        profile,
    },
});

export const getUserInformation = () => (dispatch) => {
    dispatch(displayLoadingModal());
    APIFetch.fetchPrelloAPI('profile', {
    }, APIFetch.GET)
        .then((res) => {
            dispatch(userInformationSuccess(res.data.profile));
        })
        .catch((error) => {
            dispatch(displayErrorMessageAction(error.message));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

export const updateUserInformationSuccess = (fullname, initials, bio) => ({
    type: UPDATE_USER_INFORMATION_SUCCESS,
    payload: {
        fullname,
        initials,
        bio,
    },
});

export const updateUserInformation = (fullName, initials, biography) => (dispatch) => {
    APIFetch.fetchPrelloAPI('profile', {
        fullName, initials, biography,
    }, APIFetch.PUT)
        .then(() => {
            dispatch(updateUserInformationSuccess(fullName, initials, biography));
        })
        .catch((error) => {
            dispatch(displayErrorMessageAction(error.message));
        });
};

export const updatePassword = (oldPassword, newPassword) => (dispatch) => {
    dispatch(displayLoadingModal());
    APIFetch.fetchPrelloAPI('account/password', {
        oldPassword, newPassword,
    }, APIFetch.PUT)
        .then(() => {
            dispatch(displaySuccessMessage('Password well updated'));
        })
        .catch((error) => {
            dispatch(displayErrorMessage(error.message));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

export const deleteUser = username => (dispatch) => {
    dispatch(displayLoadingModal());
    APIFetch.fetchPrelloAPI('account', {
        username,
    }, APIFetch.DELETE)
        .then(() => {
            dispatch(displaySuccessMessage('User deleted'));
            localStorage.removeItem('prello_token');
            dispatch(push('/'));
        })
        .catch((error) => {
            dispatch(displayErrorMessage(error.message));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

export const SIGN_OUT = 'auth/SIGN_OUT';

export const signOutAction = () => ({ type: SIGN_OUT });

export const signOut = () => (dispatch) => {
    localStorage.removeItem('prello_token');
    dispatch(signOutAction());
};
