import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';
import * as cardActions from '../actions/cards';

export const initialState = {
    board: undefined,
};

export default function currentBoardReducer(state = initialState, action) {
    if (action) {
        let newCards;
        let newLabel;
        let newLists;

        switch (action.type) {
        // ===== BOARD ACTIONS ===== //
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

        // ===== LISTS ACTIONS ===== //
        case listActions.CREATE_LIST_SUCCESS:
            return {
                ...state,
                board: {
                    ...state.board,
                    lists: state.board.lists.concat(action.payload.list),
                },
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

        // ===== CARDS ACTIONS ===== //
        // ===== Description ===== //
        // With started: action.payload.description is the new description.
        // With failure: action.payload.description is the old description.
        case cardActions.EDIT_CARD_DESCRIPTION_STARTED:
        case cardActions.EDIT_CARD_DESCRIPTION_FAILURE:
            return {
                ...state,
                board: {
                    ...state.board,
                    lists: state.board.lists.map(l => (
                        l._id !== action.payload.card.list._id
                            ? l
                            : {
                                ...l,
                                cards: l.cards.map(card => (card._id === action.payload.card._id
                                    ? {
                                        ...card,
                                        description: action.payload.description,
                                    }
                                    : card)),
                            }
                    )),
                },
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


        // ===== Delete label ===== //
        case cardActions.DELETE_LABEL_STARTED:
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

        case cardActions.DELETE_LABEL_FAILURE:
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

        // ===== Archive Card ===== //
        case cardActions.ARCHIVE_CARD_SUCCESS:
            newLists = state.board.lists.map(list => ({
                ...list,
                cards: list.cards.filter(card => card._id !== action.payload.cardId),
            }));

            return {
                ...state,
                board: {
                    ...state.board,
                    lists: newLists,
                },
            };


        default:
            return state;
        }
    }
    return state;
}
