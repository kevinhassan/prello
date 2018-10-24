import { displayLoadingModal, hideLoadingModal } from './modal';
import { fetchPrelloAPI, GET } from '../helpers/fetchPrelloAPI';

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
    type: FETCH_BOARD_FAILURE,
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
    fetchPrelloAPI(resource, {}, GET)
        .then(() => {
            dispatch(fetchBoardStartedAction(boardId));
            dispatch(hideLoadingModal());
        })
        .catch((error) => {
            dispatch(fetchBoardFailureAction(boardId, error));
        });
};
