import { displayLoadingModal, hideLoadingModal, displayErrorMessage } from './modal';
import APISocket from '../helpers/APISocket';
import * as APIFetch from '../helpers/APIFetch';

// ========================

// ===== Fetch boards =====
export const FETCH_BOARDS_STARTED = 'boards/FETCH_BOARDS_STARTED';
export const FETCH_BOARDS_FAILURE = 'boards/FETCH_BOARDS_FAILURE';
export const FETCH_BOARDS_SUCCESS = 'boards/FETCH_BOARDS_SUCCESS';

export const fetchBoardsStartedAction = () => ({ type: FETCH_BOARDS_STARTED });
export const fetchBoardsFailureAction = error => ({
    type: FETCH_BOARDS_FAILURE,
    payload: {
        error,
    },
});
export const fetchBoardsSuccessAction = boards => ({
    type: FETCH_BOARDS_SUCCESS,
    payload: {
        boards,
    },
});

export const fetchBoards = () => (dispatch) => {
    dispatch(fetchBoardsStartedAction());
    dispatch(displayLoadingModal());
    APIFetch.fetchPrelloAPI('boards')
        .then((res) => {
            dispatch(fetchBoardsSuccessAction(res.data.boards));
            dispatch(hideLoadingModal());
        })
        .catch((error) => {
            dispatch(fetchBoardsFailureAction(error.response.data.error));
            dispatch(hideLoadingModal());
        });
};

// ===== Fetch Board =====
export const FETCH_BOARD_STARTED = 'board/FETCH_BOARD_STARTED';
export const FETCH_BOARD_FAILURE = 'board/FETCH_BOARD_FAILURE';
export const FETCH_BOARD_SUCCESS = 'board/FETCH_BOARD_SUCCESS';

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

// ===== Remove board fetch =====
export const REMOVE_BOARD_FETCH_STARTED = 'board/REMOVE_BOARD_FETCH_STARTED';
export const REMOVE_BOARD_FETCH_FAILURE = 'board/REMOVE_BOARD_FETCH_FAILURE';
export const REMOVE_BOARD_FETCH_SUCCESS = 'board/REMOVE_BOARD_FETCH_SUCCESS';

export const removeBoardFetchStartedAction = () => ({ type: REMOVE_BOARD_FETCH_STARTED });
export const removeBoardFetchFailureAction = error => ({
    type: REMOVE_BOARD_FETCH_FAILURE,
    payload: {
        error,
    },
});
export const removeBoardFetchSuccessAction = () => ({
    type: REMOVE_BOARD_FETCH_SUCCESS,
});

export const removeBoardFetch = () => (dispatch) => {
    dispatch(removeBoardFetchStartedAction());
    APISocket.removeSubscriptionToCurrentBoard(() => {
        dispatch(removeBoardFetchSuccessAction());
    });
};

// ===== Update lists ======
export const UPDATE_LISTS_INDEXES_STARTED = 'board/UPDATE_LISTS_INDEXES_STARTED';
export const UPDATE_LISTS_INDEXES_FAILURE = 'board/UPDATE_LISTS_INDEXES_FAILURE';
export const UPDATE_LISTS_INDEXES_SUCCESS = 'board/UPDATE_LISTS_INDEXES_SUCCESS';

export const updateListsIndexesFailureAction = (error, initialLists) => ({
    type: UPDATE_LISTS_INDEXES_FAILURE,
    payload: {
        lists: initialLists,
        error,
    },
});
export const updateListsIndexesStartedAction = newLists => ({
    type: UPDATE_LISTS_INDEXES_STARTED,
    payload: {
        lists: newLists,
    },
});
export const updateListsIndexesSuccessAction = () => ({ type: UPDATE_LISTS_INDEXES_SUCCESS });

export const updateListsIndexes = (boardId, newLists, initialLists) => (dispatch) => {
    dispatch(updateListsIndexesStartedAction(newLists));
    dispatch(displayLoadingModal());
    const resource = 'boards/'.concat(boardId).concat('/lists/');
    APIFetch.fetchPrelloAPI(resource, { lists: newLists }, APIFetch.PUT)
        .then(() => {
            // API doesn't need to return the lists (too long): use directly the new order
            dispatch(updateListsIndexesSuccessAction(newLists));
        })
        .catch((error) => {
            dispatch(updateListsIndexesFailureAction(error.response.data.error, initialLists));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
