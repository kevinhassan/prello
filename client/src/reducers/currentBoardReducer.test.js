import currentBoardReducer, { initialState } from './currentBoardReducer';
import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';
import * as cardActions from '../actions/cards';

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
                cards: [{
                    _id: 'c0',
                },
                {
                    _id: 'c1',
                }],
            },
            {
                _id: 'l2',
                cards: [{
                    _id: 'c2',
                }],
            },
            {
                _id: 'l3',
                cards: [{
                    _id: 'c3',
                }],
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

describe(actions.UPDATE_LISTS_INDEXES_STARTED, () => {
    it('should correctly change the lists order to the new one', () => {
        const newLists = [
            { _id: 'l2' },
            { _id: 'l3' },
            { _id: 'l1' },
        ];
        const action = actions.updateListsIndexesStartedAction(newLists);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists).toEqual(newLists);
    });
});

describe(actions.UPDATE_LISTS_INDEXES_FAILURE, () => {
    it('should correctly change the lists order to the old one', () => {
        const initialLists = [
            { _id: 'l2' },
            { _id: 'l3' },
            { _id: 'l1' },
        ];
        const action = actions.updateListsIndexesFailureAction('error', initialLists);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists).toEqual(initialLists);
    });
});

describe(listActions.CREATE_LIST_STARTED, () => {
    it('should add a list to the bcreateListStartedActionoard', () => {
        const newList = {
            name: 'My New List',
        };
        const action = listActions.createListSuccessAction(newList);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists.length).toEqual(state.board.lists.length + 1);
        expect(finalState.board.lists.slice(-1)[0]).toEqual(newList);
    });
});

describe(cardActions.ARCHIVE_CARD_SUCCESS, () => {
    it('should set the card as "archived"', () => {
        const newCard = {
            _id: 'c1',
            isArchived: false,
        };
        const action = cardActions.archiveCardSuccessAction(newCard._id);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.filter(list => list._id === 'l1')[0].cards.length,
        ).toEqual(state.board.lists.filter(list => list._id === 'l1')[0].cards.length - 1);
    });
});
