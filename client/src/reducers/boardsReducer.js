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

        case actions.FETCH_BOARDS_FAILURE:
            return {
                ...state,
            };

        default:
            return state;
        }
    }
    return state;
}
