import { displayLoadingModal, hideLoadingModal, displayErrorMessage } from './modal';
import APISocket from '../helpers/APISocket';
import * as APIFetch from '../helpers/APIFetch';

// ========================

export const FETCH_BOARD_STARTED = 'board/FETCH_BOARD_STARTED';
export const FETCH_BOARD_FAILURE = 'board/FETCH_BOARD_FAILURE';
export const FETCH_BOARD_SUCCESS = 'board/FETCH_BOARD_SUCCESS';
export const ADD_LIST_TO_BOARD_FAILURE = 'boards/ADD_LIST_TO_BOARD_FAILURE';
export const ADD_LIST_TO_BOARD_SUCCESS = 'boards/ADD_LIST_TO_BOARD_SUCCESS';

export const fetchBoardStartedAction = () => ({ type: FETCH_BOARD_STARTED });
export const fetchBoardFailureAction = (boardId, error) => ({
    type: FETCH_BOARD_FAILURE,
    payload: {
        id: boardId,
        error,
    },
});
export const fetchBoardSuccessAction = board => ({
    type: FETCH_BOARD_SUCCESS,
    payload: {
        board,
    },
});

export const fetchBoard = boardId => (dispatch) => {
    dispatch(fetchBoardStartedAction());
    dispatch(displayLoadingModal());
    APISocket.subscribeToBoard(boardId, (res) => {
        if (res.error) {
            dispatch(fetchBoardFailureAction(res.error));
        } else {
            dispatch(fetchBoardSuccessAction(res.board));
        }
        dispatch(hideLoadingModal());
    });
};

// ===== UPDATE LISTS ======
export const UPDATE_LISTS_INDEXES = 'board/UPDATE_LISTS_INDEXES';
export const UPDATE_LISTS_INDEXES_FAILURE = 'board/UPDATE_LISTS_INDEXES_FAILURE';
export const UPDATE_LISTS_INDEXESD_STARTED = 'board/UPDATE_LISTS_INDEXES_STARTED';
export const UPDATE_LISTS_INDEXES_SUCCESS = 'board/UPDATE_LISTS_INDEXES_SUCCESS';

export const updateListsIndexesFailureAction = error => ({
    type: UPDATE_LISTS_INDEXES_FAILURE,
    payload: {
        error,
    },
});
export const updateListsIndexesStartedAction = () => ({ type: UPDATE_LISTS_INDEXESD_STARTED });
export const updateListsIndexesSuccessAction = newLists => ({
    type: UPDATE_LISTS_INDEXES_SUCCESS,
    payload: {
        lists: newLists,
    },
});

export const updateListsIndexesAction = newLists => ({
    type: UPDATE_LISTS_INDEXES,
    payload: {
        lists: newLists,
    },
});

export const updateListsIndexes = (boardId, newLists) => (dispatch) => {
    dispatch(updateListsIndexesStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'boards/'.concat(boardId).concat('/lists/');
    APIFetch.fetchPrelloAPI(resource, { lists: newLists }, APIFetch.PUT)
        .then(() => {
            // API doesn't need to return the lists (too long): use directly the new order
            dispatch(updateListsIndexesSuccessAction(newLists));
            dispatch(hideLoadingModal());
        })
        .catch((error) => {
            dispatch(updateListsIndexesFailureAction(error.response.data.error));
            dispatch(displayErrorMessage(error.response.data.error));
            dispatch(hideLoadingModal());
        });
};

export const addListToBoardSuccess = lists => ({
    type: ADD_LIST_TO_BOARD_SUCCESS,
    payload: {
        lists,
    },
});


export const addListToBoardFailure = error => ({
    type: ADD_LIST_TO_BOARD_FAILURE,
    payload: {
        error,
    },
});
