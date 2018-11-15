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
export const fetchBoardFailureAction = (message, status) => ({
    type: FETCH_BOARD_FAILURE,
    payload: {
        message,
        status,
    },
});
export const fetchBoardSuccessAction = board => ({
    type: FETCH_BOARD_SUCCESS,
    payload: {
        board,
    },
});

export const fetchBoard = boardId => (dispatch) => {
    dispatch(displayLoadingModal());
    dispatch(fetchBoardStartedAction());
    // Set up socket
    APISocket.subscribeToBoard(boardId, (res) => {
        dispatch(fetchBoardSuccessAction(res.board));
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

// ===== Update name ======
export const UPDATE_BOARD_NAME_STARTED = 'board/UPDATE_BOARD_NAME_STARTED';
export const UPDATE_BOARD_NAME_FAILURE = 'board/UPDATE_BOARD_NAME_FAILURE';
export const UPDATE_BOARD_NAME_SUCCESS = 'board/UPDATE_BOARD_NAME_SUCCESS';

export const updateBoardNameStartedAction = (boardId, name) => ({
    type: UPDATE_BOARD_NAME_STARTED,
    payload: {
        boardId,
        name,
    },
});
export const updateBoardNameFailureAction = (boardId, oldName) => ({
    type: UPDATE_BOARD_NAME_FAILURE,
    payload: {
        boardId,
        name: oldName,
    },
});
export const updateBoardNameSuccessAction = () => ({ type: UPDATE_BOARD_NAME_SUCCESS });

export const updateBoardName = (boardId, name, oldName) => (dispatch) => {
    dispatch(updateBoardNameStartedAction(boardId, name));
    dispatch(displayLoadingModal());
    const resource = `boards/${boardId}/name/${name}`;
    APIFetch.fetchPrelloAPI(resource, {}, APIFetch.PUT)
        .then(() => {
            dispatch(updateBoardNameSuccessAction());
            dispatch(displaySuccessMessage('Board renamed'));
        })
        .catch((error) => {
            dispatch(updateBoardNameFailureAction(boardId, oldName));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Update github link ======
export const UPDATE_BOARD_GITHUB_STARTED = 'board/UPDATE_BOARD_GITHUB_STARTED';
export const UPDATE_BOARD_GITHUB_FAILURE = 'board/UPDATE_BOARD_GITHUB_FAILURE';
export const UPDATE_BOARD_GITHUB_SUCCESS = 'board/UPDATE_BOARD_GITHUB_SUCCESS';

export const updateBoardGithubStartedAction = (boardId, githubRepo) => ({
    type: UPDATE_BOARD_GITHUB_STARTED,
    payload: {
        boardId,
        githubRepo,
    },
});
export const updateBoardGithubFailureAction = (boardId, oldGithubRepo) => ({
    type: UPDATE_BOARD_GITHUB_FAILURE,
    payload: {
        boardId,
        githubRepo: oldGithubRepo,
    },
});
export const updateBoardGithubSuccessAction = () => ({ type: UPDATE_BOARD_GITHUB_SUCCESS });

export const updateBoardGithub = (boardId, githubRepo, oldGithubRepo) => (dispatch) => {
    dispatch(updateBoardGithubStartedAction(boardId, githubRepo));
    dispatch(displayLoadingModal());
    const resource = `boards/${boardId}/githubRepo/`;
    APIFetch.fetchPrelloAPI(resource, githubRepo, APIFetch.PUT)
        .then(() => {
            dispatch(updateBoardGithubSuccessAction());
            dispatch(displaySuccessMessage('Link to Github updated'));
        })
        .catch((error) => {
            dispatch(updateBoardGithubFailureAction(boardId, oldGithubRepo));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};


// ===== Add member ======
export const ADD_BOARD_MEMBER_STARTED = 'board/ADD_BOARD_MEMBER_STARTED';
export const ADD_BOARD_MEMBER_FAILURE = 'board/ADD_BOARD_MEMBER_FAILURE';
export const ADD_BOARD_MEMBER_SUCCESS = 'board/ADD_BOARD_MEMBER_SUCCESS';

export const addBoardMemberStartedAction = () => ({ type: ADD_BOARD_MEMBER_STARTED });
export const addBoardMemberFailureAction = () => ({ type: ADD_BOARD_MEMBER_FAILURE });
export const addBoardMemberSuccessAction = (boardId, username) => ({
    type: ADD_BOARD_MEMBER_SUCCESS,
    payload: {
        boardId,
        username,
    },
});
export const addBoardMember = (boardId, username) => (dispatch) => {
    dispatch(addBoardMemberStartedAction());
    dispatch(displayLoadingModal());
    const resource = `boards/${boardId}/members`;
    APIFetch.fetchPrelloAPI(resource, { username }, APIFetch.POST)
        .then((res) => {
            dispatch(addBoardMemberSuccessAction(boardId, res.user));
            dispatch(displaySuccessMessage(`${username} added to the board`));
        })
        .catch((error) => {
            dispatch(addBoardMemberFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
