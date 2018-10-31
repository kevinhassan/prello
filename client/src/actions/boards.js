import { displayLoadingModal, hideLoadingModal } from './modal';
import APISocket from '../helpers/APISocket';
import * as APIFetch from '../helpers/APIFetch';

// ========================

export const FETCH_BOARD_STARTED = 'board/FETCH_BOARD_STARTED';
export const FETCH_BOARD_FAILURE = 'board/FETCH_BOARD_FAILURE';
export const FETCH_BOARD_SUCCESS = 'board/FETCH_BOARD_SUCCESS';
export const CREATE_LIST = 'board/CREATE_LIST';
export const CREATE_LIST_SUCCESS = 'board/CREATE_LIST_SUCCESS';
export const CREATE_LIST_FAILURE = 'board/CREATE_LIST_FAILURE';

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
            dispatch(updateListsIndexesFailureAction(error.message));
            dispatch(hideLoadingModal());
        });
};

export const createListAction = (boardId, lists) => ({
    type: CREATE_LIST,
    payload: {
        boardId,
        lists,
    },
});

export const createListFailure = error => ({
    type: CREATE_LIST_FAILURE,
    payload: {
        error,
    },
});

export const createListSuccess = () => ({ type: CREATE_LIST_SUCCESS });

export const createList = (boardId, lists) => (dispatch) => {
    dispatch(createListAction(boardId, lists));
    const ressource = 'board/'.concat(boardId).concat('/lists/');
    APIFetch.fetchPrelloAPI(ressource, { lists }, APIFetch.PUT)
        .then((res) => {
            if (res.ok) {
                dispatch(createListSuccess());
            } else {
                res.json().then((jsonError) => {
                    dispatch(createListFailure(jsonError.error));
                });
            }
        });
};
