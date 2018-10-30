export const DISPLAY_LOADING_MODAL = 'modal/DISPLAY_LOADING_MODAL';
export const HIDE_LOADING_MODAL = 'modal/HIDE_LOADING_MODAL';

export const DISPLAY_ERROR_MESSAGE_MODAL = 'modal/DISPLAY_ERROR_MESSAGE_MODAL';
export const HIDE_ERROR_MESSAGE_MODAL = 'modal/HIDE_ERROR_MESSAGE_MODAL';
export const DISPLAY_SUCCESS_MESSAGE_MODAL = 'modal/DISPLAY_SUCCESS_MESSAGE_MODAL';
export const HIDE_SUCCESS_MESSAGE_MODAL = 'modal/HIDE_SUCCESS_MESSAGE_MODAL';

// ====================

export const displayLoadingModalAction = () => ({
    type: DISPLAY_LOADING_MODAL,
});
export const displayLoadingModal = () => (dispatch) => { dispatch(displayLoadingModalAction()); };

export const hideLoadingModalAction = () => ({
    type: HIDE_LOADING_MODAL,
});
export const hideLoadingModal = () => (dispatch) => { dispatch(hideLoadingModalAction()); };

export const displayErrorMessageAction = errorMessage => ({
    type: DISPLAY_ERROR_MESSAGE_MODAL,
    payload: {
        errorMessage,
    },
});
export const displayErrorMessage = errorMessage => (dispatch) => { dispatch(displayErrorMessageAction(errorMessage)); };

export const hideErrorMessageAction = () => ({
    type: HIDE_ERROR_MESSAGE_MODAL,
});
export const hideErrorMessage = () => (dispatch) => { dispatch(hideErrorMessageAction()); };

export const displaySuccessMessageAction = successMessage => ({
    type: DISPLAY_SUCCESS_MESSAGE_MODAL,
    payload: {
        successMessage,
    },
});
export const displaySuccessMessage = successMessage => (dispatch) => { dispatch(displaySuccessMessageAction(successMessage)); };

export const hideSuccessMessageAction = () => ({
    type: HIDE_SUCCESS_MESSAGE_MODAL,
});
export const hideSuccessMessage = () => (dispatch) => { dispatch(hideSuccessMessageAction()); };
