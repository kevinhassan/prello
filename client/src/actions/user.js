import * as APIFetch from '../helpers/APIFetch';

export const GET_USER_INFORMATIONS = 'user/GET_USER_INFORMATIONS';
export const USER_INFORMATIONS_SUCCESS = 'user/USER_INFORMATIONS_SUCCESS';

// ==========

export const userInformationsSuccess = profile => ({
    type: USER_INFORMATIONS_SUCCESS,
    payload: {
        profile,
    },
});

export const getUserInformations = () => (dispatch) => {
    APIFetch.fetchPrelloAPI('profile', {
    }, APIFetch.GET)
        .then((res) => {
            if (res) {
                dispatch(userInformationsSuccess(res.data.profile));
            }
        })
        .catch((error) => {
            console.log(error.response.data.error);
        });
};

