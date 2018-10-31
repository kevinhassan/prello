import * as actions from '../actions/modal';

export const initialState = {
    errorMessage: '',
    isLoadingModalOpen: false,
    successMessage: '',
};

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
    case actions.DISPLAY_LOADING_MODAL:
        return {
            ...state,
            isLoadingModalOpen: true,
        };

    case actions.HIDE_LOADING_MODAL:
        return {
            ...state,
            isLoadingModalOpen: false,
        };

    case actions.DISPLAY_ERROR_MESSAGE_MODAL:
        return {
            ...state,
            errorMessage: action.payload.errorMessage,
        };

    case actions.HIDE_ERROR_MESSAGE_MODAL:
        return {
            ...state,
            errorMessage: '',
        };

    case actions.DISPLAY_SUCCESS_MESSAGE_MODAL:
        return {
            ...state,
            successMessage: action.payload.successMessage,
        };

    case actions.HIDE_SUCCESS_MESSAGE_MODAL:
        return {
            ...state,
            successMessage: '',
        };

    default:
        return state;
    }
}
