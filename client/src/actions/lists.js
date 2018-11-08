import * as APIFetch from '../helpers/APIFetch';
import {
    displayLoadingModal, hideLoadingModal, displayErrorMessage, displaySuccessMessage,
} from './modal';

// ========================

// ===== Create list ===== //
export const CREATE_LIST_STARTED = 'lists/CREATE_LIST_STARTED';
export const CREATE_LIST_FAILURE = 'lists/CREATE_LIST_FAILURE';
export const CREATE_LIST_SUCCESS = 'lists/CREATE_LIST_SUCCESS';

export const createListStartedAction = () => ({
    type: CREATE_LIST_STARTED,
});

export const createListFailureAction = error => ({
    type: CREATE_LIST_FAILURE,
    payload: {
        error,
    },
});

export const createListSuccessAction = list => ({
    type: CREATE_LIST_SUCCESS,
    payload: {
        list,
    },
});

export const createList = list => (dispatch) => {
    dispatch(createListStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'boards/'.concat(list.board._id).concat('/lists/');
    APIFetch.fetchPrelloAPI(resource, { name: list.name }, APIFetch.POST)
        .then((res) => {
            const listCreated = res.data.list;
            dispatch(createListSuccessAction(listCreated));
            dispatch(displaySuccessMessage(res.data.message));
        })
        .catch((error) => {
            dispatch(createListFailureAction(error.response.data.error));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Move card ===== //
export const MOVE_CARD_STARTED = 'lists/MOVE_CARD_STARTED';
export const MOVE_CARD_FAILURE = 'lists/MOVE_CARD_FAILURE';
export const MOVE_CARD_SUCCESS = 'lists/MOVE_CARD_SUCCESS';

export const moveCardStartedAction = () => ({
    type: MOVE_CARD_STARTED,
});

export const moveCardFailureAction = error => ({
    type: MOVE_CARD_FAILURE,
    payload: {
        error,
    },
});

export const moveCardSuccessAction = lists => ({
    type: MOVE_CARD_SUCCESS,
    payload: {
        lists,
    },
});

export const moveCard = (sourceListId, destinationListId, cardId, destinationIndex, listsUpdated) => (dispatch) => {
    dispatch(moveCardStartedAction());
    const ressource = `lists/${destinationListId}/cards/${cardId}`;
    APIFetch.fetchPrelloAPI(ressource, { index: destinationIndex, sourceListId }, APIFetch.PUT)
        .then(() => {
            dispatch(moveCardSuccessAction(listsUpdated));
            // Don't display success message for this action
            // dispatch(displaySuccessMessage(res.data.message));
        })
        .catch((error) => {
            dispatch(moveCardFailureAction(error.response.data.error));
            dispatch(displayErrorMessage(error.response.data.error));
        });
};
