import { push } from 'connected-react-router';
import * as APIFetch from '../helpers/APIFetch';
import {
    displayLoadingModal, hideLoadingModal, displayErrorMessage, displaySuccessMessage, displayErrorMessageAction,
} from './modal';


// ===== Get user info ===== //
export const GET_USER_INFORMATION_STARTED = 'user/GET_USER_INFORMATION_STARTED';
export const GET_USER_INFORMATION_FAILURE = 'user/GET_USER_INFORMATION_FAILURE';
export const GET_USER_INFORMATION_SUCCESS = 'user/GET_USER_INFORMATION_SUCCESS';

export const getUserInformationStarted = () => ({ type: GET_USER_INFORMATION_STARTED });
export const getUserInformationFailure = () => ({ type: GET_USER_INFORMATION_FAILURE });
export const getUserInformationSuccess = profile => ({
    type: GET_USER_INFORMATION_SUCCESS,
    payload: {
        profile,
    },
});

export const getUserInformation = () => (dispatch) => {
    dispatch(displayLoadingModal());
    dispatch(getUserInformationStarted());
    APIFetch.fetchPrelloAPI('profile', {}, APIFetch.GET)
        .then((res) => {
            dispatch(getUserInformationSuccess(res.data.profile));
        })
        .catch((error) => {
            dispatch(getUserInformationFailure());
            dispatch(displayErrorMessageAction(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};


// ===== Update user info ===== //
export const UPDATE_USER_INFORMATION_STARTED = 'user/UPDATE_USER_INFORMATION_STARTED';
export const UPDATE_USER_INFORMATION_FAILURE = 'user/UPDATE_USER_INFORMATION_FAILURE';
export const UPDATE_USER_INFORMATION_SUCCESS = 'user/UPDATE_USER_INFORMATION_SUCCESS';

export const updateUserInformationStarted = (fullName, initials, biography) => ({
    type: UPDATE_USER_INFORMATION_STARTED,
    payload: {
        fullName,
        initials,
        biography,
    },
});
export const updateUserInformationSuccess = () => ({ type: UPDATE_USER_INFORMATION_SUCCESS });
export const updateUserInformationFailure = (fullName, initials, biography) => ({
    type: UPDATE_USER_INFORMATION_FAILURE,
    payload: {
        fullName,
        initials,
        biography,
    },
});

export const updateUserInformation = (fullName, initials, biography, currentUser) => (dispatch) => {
    dispatch(displayLoadingModal());
    dispatch(updateUserInformationStarted(fullName, initials, biography));
    APIFetch.fetchPrelloAPI('profile', {
        fullName, initials, biography,
    }, APIFetch.PUT)
        .then(() => {
            dispatch(updateUserInformationSuccess());
            dispatch(displaySuccessMessage('Profile information updated'));
        })
        .catch((error) => {
            console.log(currentUser);
            dispatch(updateUserInformationFailure(currentUser.fullName, currentUser.initials, currentUser.biography));
            dispatch(displayErrorMessageAction(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Update password ===== //
export const UPDATE_PASSWORD_STARTED = 'user/UPDATE_PASSWORD_STARTED';
export const UPDATE_PASSWORD_FAILURE = 'user/UPDATE_PASSWORD_FAILURE';
export const UPDATE_PASSWORD_SUCCESS = 'user/UPDATE_PASSWORD_SUCCESS';

export const updatePasswordStarted = () => ({ type: UPDATE_PASSWORD_STARTED });
export const updatePasswordFailure = () => ({ type: UPDATE_PASSWORD_FAILURE });
export const updatePasswordSuccess = () => ({ type: UPDATE_PASSWORD_SUCCESS });

export const updatePassword = (oldPassword, newPassword) => (dispatch) => {
    dispatch(displayLoadingModal());
    dispatch(updatePasswordStarted());
    APIFetch.fetchPrelloAPI('account/password', {
        oldPassword, newPassword,
    }, APIFetch.PUT)
        .then(() => {
            dispatch(updatePasswordSuccess());
            dispatch(displaySuccessMessage('Password updated!'));
        })
        .catch((error) => {
            dispatch(updatePasswordFailure());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Delete account ===== //

export const DELETE_USER_SUCCESS = 'user/DELETE_USER';


export const deleteUserActionSuccess = () => ({ type: DELETE_USER_SUCCESS });

export const deleteUser = username => (dispatch) => {
    dispatch(displayLoadingModal());
    APIFetch.fetchPrelloAPI('account', {
        username,
    }, APIFetch.DELETE)
        .then(() => {
            dispatch(displaySuccessMessage('User deleted'));
            localStorage.removeItem('prello_token');
            dispatch(deleteUserActionSuccess());
            dispatch(push('/'));
        })
        .catch((error) => {
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
