import currentBoardReducer from './currentBoardReducer';
import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';

const initialState = {
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
            { _id: 'l1' },
            { _id: 'l2' },
            { _id: 'l3' },
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

describe(actions.UPDATE_LISTS_INDEXES_STARTED, () => {
    it('should correctly change the lists order to the new one', () => {
        const newLists = [
            { _id: 'l2' },
            { _id: 'l3' },
            { _id: 'l1' },
        ];
        const action = actions.updateListsIndexesStartedAction(newLists);
        const finalState = currentBoardReducer(initialState, action);

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
        const finalState = currentBoardReducer(initialState, action);

        expect(finalState.board.lists).toEqual(initialLists);
    });
});

describe(listActions.CREATE_LIST_STARTED, () => {
    it('should add a list to the bcreateListStartedActionoard', () => {
        const newList = {
            name: 'My New List',
        };
        const action = listActions.createListSuccessAction(newList);
        const finalState = currentBoardReducer(initialState, action);

        expect(finalState.board.lists.length).toEqual(initialState.board.lists.length + 1);
        expect(finalState.board.lists.slice(-1)[0]).toEqual(newList);
    });
});
