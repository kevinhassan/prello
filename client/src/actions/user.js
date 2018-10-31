import * as APIFetch from '../helpers/APIFetch';

export const GET_USER_INFORMATIONS = 'user/GET_USER_INFORMATIONS';
export const USER_INFORMATIONS_SUCCESS = 'user/USER_INFORMATIONS_SUCCESS';

// ==========

export const userInformationsSuccess = user => ({
    type: USER_INFORMATIONS_SUCCESS,
    payload: {
        user,
    },
});

export const getUserInformations = () => (dispatch) => {
    APIFetch.fetchPrelloAPI('profile', {
    }, APIFetch.GET)
        .then((res) => {
            if (res.ok) {
                console.log(res.data.profile);
                dispatch(userInformationsSuccess(res.data.profile));
            }
        })
        .catch((error) => {
            console.log(error.response.data.error);
        });
};

