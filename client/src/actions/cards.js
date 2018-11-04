import * as APIFetch from '../helpers/APIFetch';
import {
    displayErrorMessage, displaySuccessMessage, displayLoadingModal, hideLoadingModal,
} from './modal';

// ========================
export const CREATE_CARD = 'cards/CREATE_CARD';
export const DELETE_CARD = 'cards/DELETE_CARD';

export const EDIT_CARD_DESCRIPTION_STARTED = 'cards/EDIT_DESCRIPTION_STARTED';
export const EDIT_CARD_DESCRIPTION_FAILURE = 'cards/EDIT_DESCRIPTION_FAILURE';
export const EDIT_CARD_DESCRIPTION_SUCCESS = 'cards/EDIT_DESCRIPTION_SUCCESS';
// ========================

export const deleteCardAction = cardId => ({
    type: DELETE_CARD,
    payload: {
        id: cardId,
    },
});
export const deleteCard = cardId => (dispatch) => {
    dispatch(deleteCardAction(cardId));
};

export const createCardAction = () => ({
    type: CREATE_CARD,
});
export const createCard = () => dispatch => dispatch(createCardAction());


// ===== Edit description
export const editCardDescriptionStartedAction = () => ({ type: EDIT_CARD_DESCRIPTION_STARTED });
export const editCardDescriptionFailureAction = error => ({
    type: EDIT_CARD_DESCRIPTION_FAILURE,
    payload: {
        error,
    },
});
export const editCardDescriptionSuccessAction = message => ({
    type: EDIT_CARD_DESCRIPTION_SUCCESS,
    payload: {
        message,
    },
});

export const editCardDescription = (cardId, description) => (dispatch) => {
    dispatch(editCardDescriptionStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'cards/'.concat(cardId).concat('/description/');
    APIFetch.fetchPrelloAPI(resource, { description }, APIFetch.PUT)
        .then(() => {
            // API doesn't need to return the card: use directly the new description
            dispatch(editCardDescriptionSuccessAction(description));
            dispatch(hideLoadingModal());
            dispatch(displaySuccessMessage('Description updated'));
        })
        .catch((error) => {
            dispatch(editCardDescriptionFailureAction(error.message));
            dispatch(hideLoadingModal());
            dispatch(displayErrorMessage(error.message));
        });
};
