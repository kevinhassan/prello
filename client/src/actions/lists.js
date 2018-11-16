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

export const createListFailureAction = () => ({ type: CREATE_LIST_FAILURE });

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
            dispatch(createListFailureAction());
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

export const moveCardStartedAction = lists => ({
    type: MOVE_CARD_STARTED,
    payload: {
        lists,
    },
});

export const moveCardFailureAction = initialLists => ({
    type: MOVE_CARD_FAILURE,
    payload: {
        lists: initialLists,
    },
});

export const moveCardSuccessAction = () => ({
    type: MOVE_CARD_SUCCESS,
});

export const moveCard = (sourceListId, destinationListId, cardId, destinationIndex, listsUpdated, initialLists) => (dispatch) => {
    dispatch(moveCardStartedAction(listsUpdated));
    const ressource = `lists/${destinationListId}/cards/${cardId}`;
    APIFetch.fetchPrelloAPI(ressource, { index: destinationIndex, sourceListId }, APIFetch.PUT)
        .then(() => {
            dispatch(moveCardSuccessAction());
            // Don't display success message for this action
            // dispatch(displaySuccessMessage(res.data.message));
        })
        .catch((error) => {
            dispatch(moveCardFailureAction(initialLists));
            dispatch(displayErrorMessage(error.response.data.error));
        });
};


// ===== ARCHIVE LIST ===== //
export const ARCHIVE_LIST_SUCCESS = 'lists/ARCHIVE_LIST_SUCCESS';
export const ARCHIVE_LIST_STARTED = 'lists/ARCHIVE_LIST_STARTED';
export const ARCHIVE_LIST_FAILURE = 'lists/ARCHIVE_LIST_FAILURE';

export const archiveListStartedAction = () => ({ type: ARCHIVE_LIST_STARTED });

export const archiveListSuccessAction = list => ({
    type: ARCHIVE_LIST_SUCCESS,
    payload: {
        list,
    },
});

export const archiveListFailureAction = () => ({ type: ARCHIVE_LIST_FAILURE });

export const archiveList = (list, isArchived) => (dispatch) => {
    dispatch(archiveListStartedAction());
    dispatch(displayLoadingModal());
    const resource = `lists/${list._id}/isArchived`;
    APIFetch.fetchPrelloAPI(resource, { isArchived }, APIFetch.PUT)
        .then(() => {
            dispatch(archiveListSuccessAction(list));
            if (isArchived) {
                dispatch(displaySuccessMessage('List archived'));
            } else dispatch(displaySuccessMessage('List unarchived'));
        })
        .catch((error) => {
            dispatch(archiveListFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== UPDATE NAME ===== //
export const UPDATE_LIST_NAME_STARTED = 'lists/UPDATE_LIST_NAME_STARTED';
export const UPDATE_LIST_NAME_SUCCESS = 'lists/UPDATE_LIST_NAME_SUCCESS';
export const UPDATE_LIST_NAME_FAILURE = 'lists/UPDATE_LIST_NAME_FAILURE';

export const updateListNameStartedAction = (listId, name) => ({
    type: UPDATE_LIST_NAME_STARTED,
    payload: {
        listId,
        name,
    },
});

export const updateListNameSuccessAction = () => ({
    type: UPDATE_LIST_NAME_SUCCESS,
});

export const updateListNameFailureAction = (listId, name) => ({
    type: UPDATE_LIST_NAME_FAILURE,
    payload: {
        listId,
        name,
    },
});

export const updateListName = (listId, name, oldName) => (dispatch) => {
    dispatch(updateListNameStartedAction(listId, name));
    dispatch(displayLoadingModal());
    const resource = `lists/${listId}/name`;
    APIFetch.fetchPrelloAPI(resource, { name }, APIFetch.PUT)
        .then(() => {
            dispatch(updateListNameSuccessAction());
            dispatch(displaySuccessMessage('List renamed'));
        })
        .catch((error) => {
            dispatch(updateListNameFailureAction(listId, oldName));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
