import * as APIFetch from '../helpers/APIFetch';
import {
    displayErrorMessage, displaySuccessMessage, displayLoadingModal, hideLoadingModal,
} from './modal';

// ========================

// ====== Create card ===== //
export const CREATE_CARD_STARTED = 'card/CREATE_CARD_STARTED';
export const CREATE_CARD_FAILURE = 'card/CREATE_CARD_FAILURE';
export const CREATE_CARD_SUCCESS = 'card/CREATE_CARD_SUCCESS';

export const createCardStartedAction = () => ({
    type: CREATE_CARD_STARTED,
});

export const createCardFailureAction = error => ({
    type: CREATE_CARD_FAILURE,
    payload: {
        error,
    },
});

export const createCardSuccessAction = card => ({
    type: CREATE_CARD_SUCCESS,
    payload: {
        card,
    },
});

export const createCard = card => (dispatch) => {
    dispatch(createCardStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'lists/'.concat(card.list).concat('/cards/');
    APIFetch.fetchPrelloAPI(resource, { name: card.name }, APIFetch.POST)
        .then((res) => {
            const cardCreated = res.data.card;
            dispatch(createCardSuccessAction(cardCreated));
            dispatch(displaySuccessMessage(res.data.message));
        })
        .catch((error) => {
            dispatch(createCardFailureAction(error.response.data.error));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};


// ===== Edit description ===== //
export const EDIT_CARD_DESCRIPTION_STARTED = 'cards/EDIT_DESCRIPTION_STARTED';
export const EDIT_CARD_DESCRIPTION_FAILURE = 'cards/EDIT_DESCRIPTION_FAILURE';
export const EDIT_CARD_DESCRIPTION_SUCCESS = 'cards/EDIT_DESCRIPTION_SUCCESS';

export const editCardDescriptionStartedAction = (cardId, description) => ({
    type: EDIT_CARD_DESCRIPTION_STARTED,
    payload: {
        cardId,
        description,
    },
});

export const editCardDescriptionFailureAction = (error, cardId, initialDescription) => ({
    type: EDIT_CARD_DESCRIPTION_FAILURE,
    payload: {
        cardId,
        description: initialDescription,
        error,
    },
});
export const editCardDescriptionSuccessAction = () => ({ type: EDIT_CARD_DESCRIPTION_SUCCESS });

export const editCardDescription = (cardId, description, initialDescription) => (dispatch) => {
    dispatch(editCardDescriptionStartedAction(cardId, description));
    dispatch(displayLoadingModal());
    const resource = 'cards/'.concat(cardId).concat('/description/');
    APIFetch.fetchPrelloAPI(resource, { description }, APIFetch.PUT)
        .then(() => {
            // API doesn't need to return the card: use directly the new description
            dispatch(editCardDescriptionSuccessAction());
            dispatch(displaySuccessMessage('Description updated'));
        })
        .catch((error) => {
            dispatch(editCardDescriptionFailureAction(error.response.data.error, cardId, initialDescription));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Add label ===== //
export const ADD_LABEL_STARTED = 'cards/ADD_LABEL_STARTED';
export const ADD_LABEL_FAILURE = 'cards/ADD_LABEL_FAILURE';
export const ADD_LABEL_SUCCESS = 'cards/ADD_LABEL_SUCCESS';

export const addLabelStartedAction = (cardId, labelId) => ({
    type: ADD_LABEL_STARTED,
    payload: {
        cardId,
        labelId,
    },
});
export const addLabelFailureAction = (error, cardId, labelId) => ({
    type: ADD_LABEL_FAILURE,
    payload: {
        cardId,
        labelId,
        error,
    },
});
export const addLabelSuccessAction = () => ({ type: ADD_LABEL_SUCCESS });

export const addLabel = (cardId, labelId) => (dispatch) => {
    dispatch(addLabelStartedAction(cardId, labelId));
    dispatch(displayLoadingModal());
    const resource = `cards/${cardId}/labels/${labelId}`;
    APIFetch.fetchPrelloAPI(resource, {}, APIFetch.POST)
        .then((res) => {
            dispatch(addLabelSuccessAction());
            dispatch(displaySuccessMessage(res.data.message));
        })
        .catch((error) => {
            dispatch(addLabelFailureAction(error.response.data.error, cardId, labelId));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Delete label ===== //
export const DELETE_LABEL_STARTED = 'cards/DELETE_LABEL_STARTED';
export const DELETE_LABEL_FAILURE = 'cards/DELETE_LABEL_FAILURE';
export const DELETE_LABEL_SUCCESS = 'cards/DELETE_LABEL_SUCCESS';

export const deleteLabelStartedAction = () => ({ type: DELETE_LABEL_STARTED });
export const deleteLabelFailureAction = error => ({
    type: DELETE_LABEL_FAILURE,
    payload: {
        error,
    },
});
export const deleteLabelSuccessAction = message => ({
    type: DELETE_LABEL_SUCCESS,
    payload: {
        message,
    },
});

export const deleteLabel = (cardId, labelId) => (dispatch) => {
    dispatch(deleteLabelStartedAction());
    dispatch(displayLoadingModal());
    const resource = `cards/${cardId}/labels/${labelId}`;
    APIFetch.fetchPrelloAPI(resource, {}, APIFetch.DELETE)
        .then((res) => {
            dispatch(deleteLabelSuccessAction(cardId, labelId));
            dispatch(displaySuccessMessage(res.data.message));
        })
        .catch((error) => {
            dispatch(deleteLabelFailureAction(error.response.data.error));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
