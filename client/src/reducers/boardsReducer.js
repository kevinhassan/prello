import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';
import Board from '../models/Board';
import Card from '../models/Card';
import List from '../models/List';

export const initialState = {
    board: undefined,
    userBoards: [
        {
            _id: '623030303030303030303031',
            isArchived: false,
            visibility: 'public',
            labels: [
                '6c6130303030303030303031',
                '6c6130303030303030303032',
                '6c6130303030303030303033',
                '6c6130303030303030303034',
                '6c6130303030303030303035',
            ],
            lists: [
                {
                    _id: '6c3030303030303030303032',
                    cards: [1, 2, 3],
                },
                {
                    _id: '6c3030303030303030303034',
                    cards: [1, 2],
                },
                {
                    _id: '6c3030303030303030303035',
                    cards: [1, 2, 3, 4],
                },
            ],
            teams: [],
            name: 'Trello',
            members: [
                {
                    _id: '623030303030303030303031',
                    initials: 'PL',
                    isAdmin: true,
                },
                {
                    _id: '623030303030303030303032',
                    initials: 'SA5',
                    isAdmin: false,
                },
            ],
        },
        {
            _id: '623030303030303030303032',
            isArchived: false,
            visibility: 'public',
            labels: [
                '6c6130303030303030303031',
                '6c6130303030303030303032',
                '6c6130303030303030303033',
                '6c6130303030303030303034',
                '6c6130303030303030303035',
            ],
            lists: [
                {
                    _id: '6c3030303030303030303032',
                    cards: [1, 2, 3],
                },
            ],
            teams: [],
            name: 'Polytech',
            members: [
                {
                    _id: '623030303030303030303031',
                    initials: 'LO',
                    isAdmin: true,
                },
                {
                    _id: '623030303030303030303032',
                    isAdmin: false,
                    initials: 'CA2',
                },
            ],
        },
        {
            _id: '623030303030303030303033',
            isArchived: false,
            visibility: 'public',
            labels: [
                '6c6130303030303030303031',
                '6c6130303030303030303032',
                '6c6130303030303030303033',
                '6c6130303030303030303034',
                '6c6130303030303030303035',
            ],
            lists: [
            ],
            teams: [],
            name: 'AWI Project',
            members: [
                {
                    _id: '623030303030303030303029',
                    initials: 'CR',
                    isAdmin: true,
                },
                {
                    isAdmin: false,
                    initials: 'IK8',
                    _id: '623030303030303030303030',
                },
                {
                    isAdmin: false,
                    initials: 'LB',
                    _id: '623030303030303030303031',
                },
                {
                    isAdmin: false,
                    initials: 'RM5',
                    _id: '623030303030303030303032',
                },
                {
                    isAdmin: false,
                    initials: 'LB',
                    _id: '623030303030303030303033',
                },
                {
                    isAdmin: false,
                    initials: 'AC',
                    _id: '623030303030303030303034',
                },
                {
                    isAdmin: false,
                    initials: 'LK2',
                    _id: '623030303030303030303035',
                },
                {
                    isAdmin: false,
                    initials: 'AC',
                    _id: '623030303030303030303036',
                },
                {
                    isAdmin: false,
                    initials: 'LK2',
                    _id: '623030303030303030303037',
                },
                {
                    isAdmin: false,
                    initials: 'AC',
                    _id: '623030303030303030303038',
                },
                {
                    isAdmin: false,
                    initials: 'LK2',
                    _id: '623030303030303030303039',
                },
            ],
        },
        {
            _id: '623030303030303030303034',
            isArchived: false,
            visibility: 'public',
            labels: [
                '6c6130303030303030303031',
                '6c6130303030303030303032',
                '6c6130303030303030303033',
                '6c6130303030303030303034',
                '6c6130303030303030303035',
            ],
            lists: [
                {
                    _id: '6c3030303030303030303031',
                    cards: [],
                },
                {
                    _id: '6c3030303030303030303032',
                    cards: [],
                },
                {
                    _id: '6c3030303030303030303033',
                    cards: [],
                },
            ],
            teams: [],
            name: 'A board with a long title to see how it will be displayed',
            members: [
                {
                    _id: '623030303030303030303031',
                    initials: 'AB',
                    isAdmin: true,
                },
            ],
        },
        {
            _id: '623030303030303030303035',
            isArchived: false,
            visibility: 'public',
            labels: [
                '6c6130303030303030303031',
                '6c6130303030303030303032',
                '6c6130303030303030303033',
                '6c6130303030303030303034',
                '6c6130303030303030303035',
            ],
            lists: [],
            teams: [],
            name: 'Some board',
            members: [
                {
                    _id: '623030303030303030303031',
                    initials: 'CR',
                    isAdmin: true,
                },
            ],
        },

    ],
};

export default function boardsReducer(state = initialState, action) {
    switch (action.type) {
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
            board: newBoard,
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
            errorMessage: action.payload.error,
        };

    case actions.UPDATE_LISTS_INDEXES_SUCCESS:
        return {
            ...state,
            didAnErrorOccured: false,
            board: {
                ...state.board,
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
