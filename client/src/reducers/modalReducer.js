import * as actions from '../actions/modal';

export const initialState = {
    isModalOpen: false,
};

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
    case actions.DISPLAY_LOADING_MODAL:
        return {
            ...state,
            isModalOpen: true,
        };

    case actions.HIDE_LOADING_MODAL:
        return {
            ...state,
            isModalOpen: false,
        };

    default:
        return state;
    }
}
