import * as actions from '../actions/boards';

export const initialState = {
    userBoards: undefined,
};

export default function boardsReducer(state = initialState, action) {
    if (action) {
        switch (action.type) {
        case actions.FETCH_BOARDS_SUCCESS:
            return {
                ...state,
                userBoards: action.payload.boards,
            };

        case actions.UPDATE_IS_ARCHIVED_SUCCESS:
            return {
                ...state,
                userBoards: state.userBoards.map((board) => {
                    if (board._id === action.payload.boardId) {
                        return {
                            ...board,
                            isArchived: action.payload.isArchived,
                        };
                    }
                    return board;
                }),
            };

        case actions.CREATE_BOARD_SUCCESS:
            return {
                ...state,
                userBoards: state.userBoards.concat(action.payload.board),
            };

        default:
            return state;
        }
    }
    return state;
}
