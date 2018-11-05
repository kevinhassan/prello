import * as APIFetch from '../helpers/APIFetch';
import { displayLoadingModal, hideLoadingModal } from './modal';

export const GET_USER_INFORMATIONS = 'user/GET_USER_INFORMATIONS';
export const USER_INFORMATIONS_SUCCESS = 'user/USER_INFORMATIONS_SUCCESS';
export const USER_INFORMATIONS_FAILURE = 'user/USER_INFORMATIONS_FAILURE';

export const UPDATE_USER_INFORMATIONS = 'user/UPDATE_USER_INFORMATIONS';
export const UPDATE_USER_INFORMATIONS_SUCCESS = 'user/UPDATE_USER_INFORMATIONS_SUCCESS';

// ==========

export const userInformationsSuccess = profile => ({
    type: USER_INFORMATIONS_SUCCESS,
    payload: {
        profile,
    },
});

export const userInformationsFailure = error => ({
    type: USER_INFORMATIONS_FAILURE,
    payload: {
        error,
    },
});

export const getUserInformations = () => (dispatch) => {
    dispatch(displayLoadingModal());
    APIFetch.fetchPrelloAPI('profile', {
    }, APIFetch.GET)
        .then((res) => {
            dispatch(userInformationsSuccess(res.data.profile));
        })
        .catch((error) => {
            dispatch(userInformationsFailure(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

export const updateUserInformationsSuccess = (fullname, initials, bio) => ({
    type: UPDATE_USER_INFORMATIONS_SUCCESS,
    payload: {
        fullname,
        initials,
        bio,
    },
});

export const updateUserInformations = (fullName, initials, bio) => (dispatch) => {
    APIFetch.fetchPrelloAPI('profile', {
        fullName, initials, bio,
    }, APIFetch.PUT)
        .then(() => {
            dispatch(updateUserInformationsSuccess(fullName, initials, bio));
        })
        .catch((error) => {
            console.log(error.response.data.error);
        });
};
