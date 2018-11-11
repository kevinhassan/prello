import { push } from 'connected-react-router';
import {
    displayLoadingModal, hideLoadingModal, displayErrorMessage, displaySuccessMessage,
} from './modal';
import APISocket from '../helpers/APISocket';
import * as APIFetch from '../helpers/APIFetch';

// ========================
const DELAY_BEFORE_REDIRECTION = 1500;

// ===== Fetch boards =====
export const FETCH_BOARDS_STARTED = 'boards/FETCH_BOARDS_STARTED';
export const FETCH_BOARDS_FAILURE = 'boards/FETCH_BOARDS_FAILURE';
export const FETCH_BOARDS_SUCCESS = 'boards/FETCH_BOARDS_SUCCESS';

export const fetchBoardsStartedAction = () => ({ type: FETCH_BOARDS_STARTED });
export const fetchBoardsFailureAction = () => ({ type: FETCH_BOARDS_FAILURE });
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
        })
        .catch((error) => {
            dispatch(fetchBoardsFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Fetch Board =====
export const FETCH_BOARD_STARTED = 'board/FETCH_BOARD_STARTED';
export const FETCH_BOARD_FAILURE = 'board/FETCH_BOARD_FAILURE';
export const FETCH_BOARD_SUCCESS = 'board/FETCH_BOARD_SUCCESS';

export const fetchBoardStartedAction = () => ({ type: FETCH_BOARD_STARTED });
export const fetchBoardFailureAction = () => ({ type: FETCH_BOARD_FAILURE });
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
            dispatch(fetchBoardFailureAction());
            dispatch(displayErrorMessage(res.error));
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
export const removeBoardFetchFailureAction = () => ({ type: REMOVE_BOARD_FETCH_FAILURE });
export const removeBoardFetchSuccessAction = () => ({
    type: REMOVE_BOARD_FETCH_SUCCESS,
});

export const removeBoardFetch = () => (dispatch) => {
    dispatch(removeBoardFetchStartedAction());
    APISocket.removeSubscriptionToCurrentBoard(() => {
        dispatch(removeBoardFetchSuccessAction());
    });
};

// ====== Create Board ======
export const CREATE_BOARD_STARTED = 'board/CREATE_BOARD_STARTED';
export const CREATE_BOARD_FAILURE = 'board/CREATE_BOARD_FAILURE';
export const CREATE_BOARD_SUCCESS = 'board/CREATE_BOARD_SUCCESS';

export const createBoardStartedAction = () => ({ type: CREATE_BOARD_STARTED });
export const createBoardFailureAction = () => ({ type: CREATE_BOARD_FAILURE });
export const createBoardSuccessAction = board => ({
    type: CREATE_BOARD_SUCCESS,
    payload: {
        board,
    },
});

export const createBoard = (name, visibility) => (dispatch) => {
    dispatch(createBoardStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'boards/';
    APIFetch.fetchPrelloAPI(resource, { name, visibility }, APIFetch.POST)
        .then((res) => {
            const boardCreated = res.data.board;
            dispatch(displaySuccessMessage(`${res.data.message}\nRedirecting...`));
            dispatch(createBoardSuccessAction(boardCreated));
            setTimeout(() => {
                dispatch(push(`/boards/${boardCreated._id}`));
                dispatch(hideLoadingModal());
            }, DELAY_BEFORE_REDIRECTION);
        })
        .catch((error) => {
            dispatch(createBoardFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
            dispatch(hideLoadingModal());
        });
};

// ===== Update lists ======
export const UPDATE_LISTS_INDEXES_STARTED = 'board/UPDATE_LISTS_INDEXES_STARTED';
export const UPDATE_LISTS_INDEXES_FAILURE = 'board/UPDATE_LISTS_INDEXES_FAILURE';
export const UPDATE_LISTS_INDEXES_SUCCESS = 'board/UPDATE_LISTS_INDEXES_SUCCESS';

export const updateListsIndexesFailureAction = initialLists => ({
    type: UPDATE_LISTS_INDEXES_FAILURE,
    payload: {
        lists: initialLists,
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
            dispatch(updateListsIndexesSuccessAction());
        })
        .catch((error) => {
            dispatch(updateListsIndexesFailureAction(initialLists));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Update isArchived ======
export const UPDATE_IS_ARCHIVED_STARTED = 'board/UPDATE_IS_ARCHIVED_STARTED';
export const UPDATE_IS_ARCHIVED_FAILURE = 'board/UPDATE_IS_ARCHIVED_FAILURE';
export const UPDATE_IS_ARCHIVED_SUCCESS = 'board/UPDATE_IS_ARCHIVED_SUCCESS';

export const updateIsArchivedStartedAction = () => ({ type: UPDATE_IS_ARCHIVED_STARTED });
export const updateIsArchivedFailureAction = () => ({ type: UPDATE_IS_ARCHIVED_FAILURE });
export const updateIsArchivedSuccessAction = (boardId, isArchived) => ({
    type: UPDATE_IS_ARCHIVED_SUCCESS,
    payload: {
        boardId,
        isArchived,
    },
});

export const updateIsArchived = (boardId, isArchived) => (dispatch) => {
    dispatch(updateIsArchivedStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'boards/'.concat(boardId).concat('/isArchived');
    APIFetch.fetchPrelloAPI(resource, { isArchived }, APIFetch.PUT)
        .then(() => {
            dispatch(updateIsArchivedSuccessAction(boardId, isArchived));
            dispatch(displaySuccessMessage('Board archived'));
            dispatch(push('./boards'));
        })
        .catch((error) => {
            dispatch(updateIsArchivedFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
