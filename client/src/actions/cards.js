import * as APIFetch from '../helpers/APIFetch';
import {
    displayErrorMessage, displaySuccessMessage, displayLoadingModal, hideLoadingModal,
} from './modal';

// ========================

// ====== Create card ===== //
export const CREATE_CARD_STARTED = 'card/CREATE_CARD_STARTED';
export const CREATE_CARD_FAILURE = 'card/CREATE_CARD_FAILURE';
export const CREATE_CARD_SUCCESS = 'card/CREATE_CARD_SUCCESS';

export const createCardStartedAction = () => ({ type: CREATE_CARD_STARTED });
export const createCardFailureAction = () => ({ type: CREATE_CARD_FAILURE });
export const createCardSuccessAction = card => ({
    type: CREATE_CARD_SUCCESS,
    payload: {
        card,
    },
});

export const createCard = card => (dispatch) => {
    dispatch(createCardStartedAction());
    dispatch(displayLoadingModal());
    const resource = `lists/${card.list._id}/cards/`;
    APIFetch.fetchPrelloAPI(resource, { name: card.name }, APIFetch.POST)
        .then((res) => {
            dispatch(createCardSuccessAction(res.data.card));
            dispatch(displaySuccessMessage(res.data.message));
        })
        .catch((error) => {
            dispatch(createCardFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Edit name ===== //
export const EDIT_CARD_NAME_STARTED = 'cards/EDIT_CARD_NAME_STARTED';
export const EDIT_CARD_NAME_FAILURE = 'cards/EDIT_CARD_NAME_FAILURE';
export const EDIT_CARD_NAME_SUCCESS = 'cards/EDIT_CARD_NAME_SUCCESS';

export const editCardNameStartedAction = (card, name) => ({
    type: EDIT_CARD_NAME_STARTED,
    payload: {
        card,
        name,
    },
});

export const editCardNameFailureAction = (card, initialName) => ({
    type: EDIT_CARD_NAME_FAILURE,
    payload: {
        card,
        name: initialName,
    },
});
export const editCardNameSuccessAction = () => ({ type: EDIT_CARD_NAME_SUCCESS });

export const editCardName = (card, name, initialName) => (dispatch) => {
    dispatch(editCardNameStartedAction(card, name));
    dispatch(displayLoadingModal());
    const resource = 'cards/'.concat(card._id).concat('/name/');
    APIFetch.fetchPrelloAPI(resource, { name }, APIFetch.PUT)
        .then(() => {
            // API doesn't need to return the card: use directly the new name
            dispatch(editCardNameSuccessAction());
            dispatch(displaySuccessMessage('Description updated'));
        })
        .catch((error) => {
            dispatch(editCardNameFailureAction(card, initialName));
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

export const editCardDescriptionStartedAction = (card, description) => ({
    type: EDIT_CARD_DESCRIPTION_STARTED,
    payload: {
        card,
        description,
    },
});

export const editCardDescriptionFailureAction = (card, initialDescription) => ({
    type: EDIT_CARD_DESCRIPTION_FAILURE,
    payload: {
        card,
        description: initialDescription,
    },
});
export const editCardDescriptionSuccessAction = () => ({ type: EDIT_CARD_DESCRIPTION_SUCCESS });

export const editCardDescription = (card, description, initialDescription) => (dispatch) => {
    dispatch(editCardDescriptionStartedAction(card, description));
    dispatch(displayLoadingModal());
    const resource = 'cards/'.concat(card._id).concat('/description/');
    APIFetch.fetchPrelloAPI(resource, { description }, APIFetch.PUT)
        .then(() => {
            // API doesn't need to return the card: use directly the new description
            dispatch(editCardDescriptionSuccessAction());
            dispatch(displaySuccessMessage('Description updated'));
        })
        .catch((error) => {
            dispatch(editCardDescriptionFailureAction(card, initialDescription));
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
export const addLabelFailureAction = (cardId, labelId) => ({
    type: ADD_LABEL_FAILURE,
    payload: {
        cardId,
        labelId,
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
            dispatch(addLabelFailureAction(cardId, labelId));
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

export const deleteLabelStartedAction = (cardId, labelId) => ({
    type: DELETE_LABEL_STARTED,
    payload: {
        cardId,
        labelId,
    },
});

export const deleteLabelFailureAction = (cardId, labelId) => ({
    type: DELETE_LABEL_FAILURE,
    payload: {
        cardId,
        labelId,
    },
});
export const deleteLabelSuccessAction = () => ({ type: DELETE_LABEL_SUCCESS });

export const deleteLabel = (cardId, labelId) => (dispatch) => {
    dispatch(deleteLabelStartedAction(cardId, labelId));
    dispatch(displayLoadingModal());
    const resource = `cards/${cardId}/labels/${labelId}`;
    APIFetch.fetchPrelloAPI(resource, {}, APIFetch.DELETE)
        .then((res) => {
            dispatch(deleteLabelSuccessAction());
            dispatch(displaySuccessMessage(res.data.message));
        })
        .catch((error) => {
            dispatch(deleteLabelFailureAction(cardId, labelId));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};


// ===== ARCHIVE CARD ===== //
export const ARCHIVE_CARD_SUCCESS = 'cards/ARCHIVE_CARD_SUCCESS';
export const ARCHIVE_CARD_STARTED = 'cards/ARCHIVE_CARD_STARTED';
export const ARCHIVE_CARD_FAILURE = 'cards/ARCHIVE_CARD_FAILURE';

export const archiveCardStartedAction = () => ({ type: ARCHIVE_CARD_STARTED });

export const archiveCardSuccessAction = (card, isArchived) => ({
    type: ARCHIVE_CARD_SUCCESS,
    payload: {
        card,
        isArchived,
    },
});

export const archiveCardFailureAction = () => ({ type: ARCHIVE_CARD_FAILURE });

export const archiveCard = (card, isArchived) => (dispatch) => {
    dispatch(archiveCardStartedAction());
    dispatch(displayLoadingModal());
    const resource = `cards/${card._id}/isArchived`;
    APIFetch.fetchPrelloAPI(resource, { isArchived }, APIFetch.PUT)
        .then(() => {
            dispatch(archiveCardSuccessAction(card, isArchived));
            if (isArchived) dispatch(displaySuccessMessage('Card archived'));
            else dispatch(displaySuccessMessage('Card unarchived'));
        })
        .catch((error) => {
            dispatch(archiveCardFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== EDIT DATE ===== //
export const EDIT_DATE_SUCCESS = 'cards/EDIT_DATE_SUCCESS';
export const EDIT_DATE_STARTED = 'cards/EDIT_DATE_STARTED';
export const EDIT_DATE_FAILURE = 'cards/EDIT_DATE_FAILURE';


export const editDateStartedAction = (card, dueDate) => ({
    type: EDIT_DATE_STARTED,
    payload: {
        card,
        dueDate,
    },
});

export const editDateSuccessAction = () => ({ type: EDIT_DATE_SUCCESS });

export const editDateFailureAction = (card, initialDate) => ({
    type: EDIT_DATE_FAILURE,
    payload: {
        card,
        initialDate,
    },
});

export const editDate = (card, dueDate, initialDate) => (dispatch) => {
    dispatch(editDateStartedAction(card, dueDate));
    dispatch(displayLoadingModal());
    const resource = `cards/${card._id}/dueDate`;
    APIFetch.fetchPrelloAPI(resource, { dueDate, initialDate }, APIFetch.PUT)
        .then(() => {
            dispatch(editDateSuccessAction());
            dispatch(displaySuccessMessage('Due date updated'));
        })
        .catch((error) => {
            dispatch(editDateFailureAction(card, initialDate));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
