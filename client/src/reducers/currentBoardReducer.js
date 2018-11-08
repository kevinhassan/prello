import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';

export const initialState = {
    board: undefined,
};

export default function currentBoardReducer(state = initialState, action) {
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
            board: action.payload.board,
        };

    case actions.REMOVE_BOARD_FETCH_SUCCESS:
        return {
            ...state,
            board: undefined,
        };

    case listActions.MOVE_CARD_SUCCESS:
        return {
            ...state,
            board: {
                ...state.board,
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
            board: {
                ...state.board,
                lists: action.payload.lists,
            },
        };

    case actions.UPDATE_LISTS_INDEXES_FAILURE:
        return state;

    default:
        return state;
    }
}
