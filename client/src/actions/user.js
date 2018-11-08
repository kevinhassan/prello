import * as APIFetch from '../helpers/APIFetch';
import { displayLoadingModal, hideLoadingModal } from './modal';

export const GET_USER_INFORMATION = 'user/GET_USER_INFORMATION';
export const USER_INFORMATION_SUCCESS = 'user/USER_INFORMATION_SUCCESS';
export const USER_INFORMATION_FAILURE = 'user/USER_INFORMATION_FAILURE';

export const UPDATE_USER_INFORMATION = 'user/UPDATE_USER_INFORMATION';
export const UPDATE_USER_INFORMATION_SUCCESS = 'user/UPDATE_USER_INFORMATION_SUCCESS';

// ==========

export const userInformationSuccess = profile => ({
    type: USER_INFORMATION_SUCCESS,
    payload: {
        profile,
    },
});

export const userInformationFailure = error => ({
    type: USER_INFORMATION_FAILURE,
    payload: {
        error,
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
            dispatch(userInformationFailure(error.message));
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

export const updateUserInformation = (fullName, initials, bio) => (dispatch) => {
    APIFetch.fetchPrelloAPI('profile', {
        fullName, initials, bio,
    }, APIFetch.PUT)
        .then(() => {
            dispatch(updateUserInformationSuccess(fullName, initials, bio));
        })
        .catch((error) => {
            console.log(error);
        });
};

export const updatePassword = (oldPassword, newPassword) => (dispatch) => {
    dispatch(displayLoadingModal());
    APIFetch.fetchPrelloAPI('account/password', {
        oldPassword, newPassword,
    }, APIFetch.PUT)
        .then((res) => {
            console.log(res.data.user);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
