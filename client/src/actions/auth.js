import * as APIFetch from '../helpers/APIFetch';

export const CLASSIC_SIGN_IN = 'auth/CLASSIC_SIGN_IN';
export const CLASSIC_SIGN_IN_STARTED = 'auth/CLASSIC_SIGN_IN_STARTED';
export const CLASSIC_SIGN_IN_FAILURE = 'auth/CLASSIC_SIGN_IN_FAILURE';
export const CLASSIC_SIGN_IN_SUCCESS = 'auth/CLASSIC_SIGN_IN_SUCCESS';

export const CLASSIC_SIGN_UP = 'auth/CLASSIC_SIGN_UP';
export const CLASSIC_SIGN_UP_STARTED = 'auth/CLASSIC_SIGN_UP_STARTED';
export const CLASSIC_SIGN_UP_SUCCESS = 'auth/CLASSIC_SIGN_UP_SUCCESS';
export const CLASSIC_SIGN_UP_FAILURE = 'auth/CLASSIC_SIGN_UP_FAILURE';

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
    APIFetch.fetchPrelloAPI('login', { email, password }, APIFetch.POST)
        .then((res) => {
            dispatch(classicSignInSuccess(res.response.data.token));
        })
        .catch((error) => {
            dispatch(classicSignInFailure(error.response.data.error));
        });
};


export const classicSignUpAction = (name, username, email, password) => ({
    type: CLASSIC_SIGN_UP,
    payload: {
        name,
        username,
        email,
        password,
    },
});


export const classicSignUpStarted = () => ({ type: CLASSIC_SIGN_UP_STARTED });

export const classicSignUpFailure = error => ({
    type: CLASSIC_SIGN_UP_FAILURE,
    payload: {
        error,
    },
});
export const classicSignUpSuccess = () => ({ type: CLASSIC_SIGN_UP_SUCCESS });


export const classicSignUp = (name, nickname, email, password) => (dispatch) => {
    dispatch(classicSignInStarted());
    APIFetch.fetchPrelloAPI('register', {
        name, nickname, email, password,
    }, APIFetch.POST)
        .then((res) => {
            if (res.ok) {
                dispatch(classicSignUpSuccess());
            } else {
                res.json().then((jsonError) => {
                    dispatch(classicSignUpFailure(jsonError.error));
                });
            }
        });
};
