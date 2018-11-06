import * as actions from '../actions/boards';
import Board from '../models/Board';
import Card from '../models/Card';
import List from '../models/List';

export const initialState = {
    board: undefined,
};

export default function boardsReducer(state = initialState, action) {
    switch (action.type) {
    case actions.FETCH_BOARD_SUCCESS:
        // Convert JSON to Object (Board, List, Card)
        const boardObject = new Board(action.payload.board);
        action.payload.board.lists.forEach((list, listIdx) => {
            boardObject.lists[listIdx] = new List(list);
            list.cards.forEach((card, cardIdx) => {
                boardObject.lists[listIdx].cards[cardIdx] = new Card(card);
            });
        });

        return {
            ...state,
            board: boardObject,
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
        return {
            ...state,
        };

    case actions.ADD_LIST_TO_BOARD_SUCCESS:
        return {
            ...state,
            board: {
                ...state.board,
                lists: action.payload.lists,
            },
        };

    case actions.ADD_LIST_TO_BOARD_FAILURE:
        return {
            ...state,
            errorMessage: action.payload.error,
        };


    default:
        return state;
    }
}
