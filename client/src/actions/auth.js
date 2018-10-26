import * as APIFetch from '../helpers/APIFetch';

export const CLASSIC_SIGN_IN = 'auth/CLASSIC_SIGN_IN';
export const CLASSIC_SIGN_IN_STARTED = 'auth/CLASSIC_SIGN_IN_STARTED';
export const CLASSIC_SIGN_IN_FAILURE = 'auth/CLASSIC_SIGN_IN_FAILURE';
export const CLASSIC_SIGN_IN_SUCCESS = 'auth/CLASSIC_SIGN_IN_SUCCESS';

export const classicSignInAction = (email, password) => ({
    type: CLASSIC_SIGN_IN,
    payload: {
        email,
        password,
    },
});

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
    dispatch(classicSignInStarted());

    APIFetch.fetchPrelloAPI('login', { username: email, password }, APIFetch.POST)
        .then((res) => {
            dispatch(classicSignInSuccess(res.token));
        })
        .catch((error) => {
            dispatch(classicSignInFailure(error.message));
        });
};
