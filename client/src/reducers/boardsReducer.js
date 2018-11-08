import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';

export const initialState = {
    currentBoard: undefined,
    userBoards: undefined,
};

export default function boardsReducer(state = initialState, action) {
    switch (action.type) {
    case listActions.CREATE_LIST_SUCCESS:
        return {
            ...state,
        };

    case listActions.CREATE_LIST_FAILURE:
        return {
            ...state,
        };

    case actions.FETCH_BOARD_SUCCESS:
        return {
            ...state,
            currentBoard: action.payload.board,
        };

    case actions.FETCH_BOARDS_SUCCESS:
        return {
            ...state,
            userBoards: action.payload.boards,
        };

    case actions.REMOVE_BOARD_FETCH_SUCCESS:
        return {
            ...state,
            currentBoard: undefined,
        };

    case listActions.MOVE_CARD_SUCCESS:
        return {
            ...state,
            currentBoard: {
                ...state.currentBoard,
                lists: action.payload.lists,
            },
        };

    case listActions.MOVE_CARD_FAILURE:
        return {
            ...state,
        };

    case actions.UPDATE_LISTS_INDEXES_SUCCESS:
        return {
            ...state,
            currentBoard: {
                ...state.currentBoard,
                lists: action.payload.lists,
            },
        };

    case actions.UPDATE_LISTS_INDEXES_FAILURE:
        return state;

    default:
        return state;
    }
}
