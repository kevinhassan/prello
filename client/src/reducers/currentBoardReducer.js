import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';
import * as cardActions from '../actions/cards';

export const initialState = {
    board: undefined,
};

export default function currentBoardReducer(state = initialState, action) {
    let newCards;
    let newLabel;
    let newLists;

    switch (action.type) {
    // ===== Board Actions ===== //
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


    case actions.UPDATE_LISTS_INDEXES_STARTED:
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
            board: {
                ...state.board,
                lists: action.payload.lists,
            },
        };

    // ===== List Actions ===== //
    case listActions.CREATE_LIST_SUCCESS:
        return {
            ...state,
            board: {
                ...state.board,
                lists: state.board.lists.concat(action.payload.list),
            },
        };

    case listActions.CREATE_LIST_FAILURE:
        return {
            ...state,
        };

    // With started: action.payload.lists is the new lists.
    // With failure: action.payload.lists is the old lists.
    case listActions.MOVE_CARD_STARTED:
    case listActions.MOVE_CARD_FAILURE:
        return {
            ...state,
            board: {
                ...state.board,
                lists: action.payload.lists,
            },
        };

    case listActions.MOVE_CARD_SUCCESS:
        return {
            ...state,
        };

    // ===== Card Actions ===== //
    // With started: action.payload.description is the new description.
    // With failure: action.payload.description is the old description.
    case cardActions.EDIT_CARD_DESCRIPTION_STARTED:
    case cardActions.EDIT_CARD_DESCRIPTION_FAILURE:
        newLists = state.board.lists.map((l) => {
            newCards = l.cards.map((card) => {
                if (card._id === action.payload.cardId) {
                    return {
                        ...card,
                        description: action.payload.description,
                    };
                }
                return card;
            });
            return {
                ...l,
                cards: newCards,
            };
        });

        return {
            ...state,
            board: {
                ...state.board,
                lists: newLists,
            },
        };

    case cardActions.EDIT_CARD_DESCRIPTION_SUCCESS:
        return {
            ...state,
        };

    // ===== Add label ===== //
    case cardActions.ADD_LABEL_STARTED:
        newLabel = state.board.labels.find(lab => lab._id === action.payload.labelId);

        newLists = state.board.lists.map((list) => {
            newCards = list.cards.map((card) => {
                if (card._id === action.payload.cardId) {
                    return {
                        ...card,
                        labels: card.labels.concat(newLabel),
                    };
                }
                return card;
            });

            return {
                ...list,
                cards: newCards,
            };
        });

        return {
            ...state,
            board: {
                ...state.board,
                lists: newLists,
            },
        };

    case cardActions.ADD_LABEL_FAILURE:
        newLabel = state.board.labels.find(lab => lab._id === action.payload.labelId);

        newLists = state.board.lists.map((list) => {
            newCards = list.cards.map((card) => {
                if (card._id === action.payload.cardId) {
                    return {
                        ...card,
                        labels: card.labels.filter(label => label._id !== newLabel._id),
                    };
                }
                return card;
            });

            return {
                ...list,
                cards: newCards,
            };
        });

        return {
            ...state,
            board: {
                ...state.board,
                lists: newLists,
            },
        };


    case cardActions.ADD_LABEL_SUCCESS:
        return {
            ...state,
        };


    default:
        return state;
    }
}
