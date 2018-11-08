import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';

import Board from '../models/Board';
import Card from '../models/Card';
import List from '../models/List';

export const initialState = {
    currentBoard: undefined,
    userBoards: undefined,
};

export default function boardsReducer(state = initialState, action) {
    switch (action.type) {
    case actions.ADD_LIST_TO_BOARD_SUCCESS:
        return {
            ...state,
            currentBoard: {
                ...state.currentBoard,
                lists: action.payload.lists,
            },
        };

    case actions.ADD_LIST_TO_BOARD_FAILURE:
        return {
            ...state,
            errorMessage: action.payload.error,
        };

    case actions.FETCH_BOARDS_SUCCESS:
        const newBoards = action.payload.boards.map(board => new Board(board));
        return {
            ...state,
            userBoards: newBoards,
        };

    case actions.FETCH_BOARD_SUCCESS:
        // Convert JSON to Object (Board, List, Card)
        const newBoard = new Board(action.payload.board);
        action.payload.board.lists.forEach((list, listIdx) => {
            newBoard.lists[listIdx] = new List(list);
            list.cards.forEach((card, cardIdx) => {
                newBoard.lists[listIdx].cards[cardIdx] = new Card(card);
            });
        });

        return {
            ...state,
            currentBoard: newBoard,
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
            errorMessage: action.payload.error,
        };

    case actions.UPDATE_LISTS_INDEXES_SUCCESS:
        return {
            ...state,
            didAnErrorOccured: false,
            currentBoard: {
                ...state.currentBoard,
                lists: action.payload.lists,
            },
        };

    case actions.UPDATE_LISTS_INDEXES_FAILURE:
        return {
            ...state,
            didAnErrorOccured: true,
        };


    default:
        return state;
    }
}
