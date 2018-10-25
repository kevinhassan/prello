import { displayLoadingModal, hideLoadingModal } from './modal';

// ========================

export const FETCH_BOARD = 'board/FETCH_BOARD';
export const FETCH_BOARD_FAILURE = 'board/FETCH_BOARD_FAILURE';
export const FETCH_BOARD_STARTED = 'board/FETCH_BOARD_STARTED';
export const FETCH_BOARD_SUCCESS = 'board/FETCH_BOARD_SUCCESS';

export const fetchBoardFailureAction = (boardId, error) => ({
    type: FETCH_BOARD_FAILURE,
    payload: {
        id: boardId,
        error,
    },
});
export const fetchBoardStartedAction = () => ({ type: FETCH_BOARD_STARTED });
export const fetchBoardSuccessAction = (boardId, res) => ({
    type: FETCH_BOARD_SUCCESS,
    payload: {
        id: boardId,
        res,
    },
});

export const fetchBoardAction = boardId => ({
    type: FETCH_BOARD,
    payload: {
        id: boardId,
    },
});
export const fetchBoard = boardId => (dispatch) => {
    dispatch(displayLoadingModal());
    dispatch(fetchBoardStartedAction());
    const resource = '/board/'.concat(boardId);
    /*
    fetchPrelloAPI(resource, {}, GET)
        .then(() => {
            dispatch(fetchBoardStartedAction(boardId));
            dispatch(hideLoadingModal());
        })
        .catch((error) => {
            dispatch(fetchBoardFailureAction(boardId, error));
        });
    */
};

// =====
export const UPDATE_LISTS_INDEXES = 'board/UPDATE_LISTS_INDEXES';
export const UPDATE_LISTS_INDEXES_FAILURE = 'board/UPDATE_LISTS_INDEXES_FAILURE';
export const UPDATE_LISTS_INDEXESD_STARTED = 'board/UPDATE_LISTS_INDEXES_STARTED';
export const UPDATE_LISTS_INDEXES_SUCCESS = 'board/UPDATE_LISTS_INDEXES_SUCCESS';

export const updateListsIndexesFailureAction = (newLists, error) => ({
    type: UPDATE_LISTS_INDEXES_FAILURE,
    payload: {
        lists: newLists,
        error,
    },
});
export const updateListsIndexesStartedAction = () => ({ type: UPDATE_LISTS_INDEXESD_STARTED });
export const updateListsIndexesSuccessAction = (newLists, res) => ({
    type: UPDATE_LISTS_INDEXES_SUCCESS,
    payload: {
        lists: newLists,
        res,
    },
});

export const updateListsIndexesAction = newLists => ({
    type: UPDATE_LISTS_INDEXES,
    payload: {
        lists: newLists,
    },
});
export const updateListsIndexes = newLists => (dispatch) => {
    dispatch(displayLoadingModal());
    dispatch(updateListsIndexesStartedAction());
    const resource = '/board/'.concat(newLists);
    /*
    fetchPrelloAPI(resource, {}, POST)
        .then(() => {
            dispatch(updateListsIndexesStartedAction(newLists));
            dispatch(hideLoadingModal());
        })
        .catch((error) => {
            dispatch(updateListsIndexesFailureAction(newLists, error));
        });
    */
};
