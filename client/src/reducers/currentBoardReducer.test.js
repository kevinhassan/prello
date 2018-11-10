import currentBoardReducer, { initialState } from './currentBoardReducer';
import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';
import * as cardActions from '../actions/cards';

const card1 = {
    _id: 'c1',
    name: 'card1',
    labels: [
        {
            _id: 'lab1',
            name: 'label1',
        },
        {
            _id: 'lab2',
            name: 'label2',
        },
    ],
    list: { _id: 'l1' },
};
const card2 = {
    _id: 'c2',
    name: 'card2',
    labels: [
        {
            _id: 'lab1',
            name: 'label1',
        },
    ],
};
const card3 = {
    _id: 'c3',
    name: 'card3',
    labels: [],
    list: { _id: 'l3' },
};
const state = {
    board: {
        _id: 'b1',
        isArchived: false,
        visibility: 'public',
        labels: [
            { _id: 'lab1' },
            { _id: 'lab2' },
            { _id: 'lab3' },
        ],
        lists: [
            {
                _id: 'l1',
                cards: [card1, card2],
            },
            {
                _id: 'l2',
                cards: [],
            },
            {
                _id: 'l3',
                cards: [card3],
            },
        ],
        admins: [
            { _id: 'ad1' },
        ],
        members: [
            { _id: 'm1' },
            { _id: 'm2' },
        ],
        teams: [
            { _id: 't1' },
        ],
        name: 'A tested board',
        owner: {
            _id: '623030303030303030303031',
        },
    },
};

describe('Action not referenced', () => {
    it('should return the current state', () => {
        const finalState = currentBoardReducer();
        expect(finalState).toEqual(initialState);
        const finalState2 = currentBoardReducer(initialState, { type: 'notReferencedAction ' });
        expect(finalState2).toEqual(initialState);
    });
});

// ===== BOARDS ACTIONS ===== //

describe(actions.UPDATE_LISTS_INDEXES_STARTED, () => {
    it('should correctly change the lists order to the new one', () => {
        const newListsOrder = state.board.lists.reverse();
        const action = actions.updateListsIndexesStartedAction(newListsOrder);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists).toEqual(newListsOrder);
    });
});

describe(actions.UPDATE_LISTS_INDEXES_FAILURE, () => {
    it('should correctly change the lists order to the old one', () => {
        const newListsOrder = state.board.lists.reverse();
        const action = actions.updateListsIndexesFailureAction('error', newListsOrder);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists).toEqual(state.board.lists);
    });
});

// ===== LISTS ACTIONS ===== //

describe(listActions.CREATE_LIST_STARTED, () => {
    it('should add a list to the board', () => {
        const newList = {
            name: 'My New List',
        };
        const action = listActions.createListSuccessAction(newList);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists.length).toEqual(state.board.lists.length + 1);
        expect(finalState.board.lists.slice(-1)[0]).toEqual(newList);
    });
});

// ===== CARDS ACTIONS ===== //
describe(cardActions.DELETE_LABEL_STARTED, () => {
    it('should remove the label sent to the current ones', () => {
        const labelToRemove = card1.labels.pop();
        const action = cardActions.deleteLabelStartedAction('an error occured', card1._id, labelToRemove);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).labels,
        ).toEqual(card1.labels);
    });
});

describe(cardActions.DELETE_LABEL_FAILURE, () => {
    it('should append the label sent to the current ones', () => {
        const newLabel = state.board.labels[3];
        const action = cardActions.deleteLabelFailureAction('an error occured', card1._id, newLabel);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).labels,
        ).toEqual(card1.labels.concat(newLabel));
    });
});

describe(cardActions.ARCHIVE_CARD_SUCCESS, () => {
    it('should set the card as "archived"', () => {
        const action = cardActions.archiveCardSuccessAction(card3);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card3.list._id)
                .cards.find(c => c._id === card3._id).isArchived,
        ).toEqual(true);
    });
});
