import currentBoardReducer, { initialState } from './currentBoardReducer';
import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';
import * as cardActions from '../actions/cards';

const labels = [
    { _id: 'lab1', name: 'label1' },
    { _id: 'lab2', name: 'label2' },
    { _id: 'lab3', name: 'label3' },
];
const card1 = {
    _id: 'c1',
    name: 'card1',
    labels: [labels[0], labels[1]],
    list: { _id: 'l1' },
};
const card2 = {
    _id: 'c2',
    name: 'card2',
    labels: [labels[0]],
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
        labels,
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
describe(actions.FETCH_BOARD_SUCCESS, () => {
    it('should put the new board in state', () => {
        const newBoard = { _id: 'newBoardI', name: 'new board' };
        const action = actions.fetchBoardSuccessAction(newBoard);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board).toEqual(newBoard);
    });
});

describe(actions.REMOVE_BOARD_FETCH_SUCCESS, () => {
    it('should set the board to undefined', () => {
        const action = actions.removeBoardFetchSuccessAction();
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board).toEqual(undefined);
    });
});


describe(actions.REMOVE_BOARD_FETCH_SUCCESS, () => {
    it('should correctly change the lists order to the new one', () => {
        const newListsOrder = state.board.lists.reverse();
        const action = actions.updateListsIndexesStartedAction(newListsOrder);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists).toEqual(newListsOrder);
    });
});

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
        const action = actions.updateListsIndexesFailureAction(newListsOrder);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists).toEqual(state.board.lists);
    });
});

// ===== LISTS ACTIONS ===== //

// Create list
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

// Move card
describe(listActions.MOVE_CARD_STARTED, () => {
    it('should assign the new lists (and cards) to the state', () => {
        const newLists = state.board.lists.reverse();
        const action = listActions.moveCardStartedAction(newLists);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists).toEqual(newLists);
    });
});

describe(listActions.MOVE_CARD_FAILURE, () => {
    it('should replace the state lists with the lists (and cards) given', () => {
        const lists = state.board.lists.reverse();
        const action = listActions.moveCardFailureAction('error', lists);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists).toEqual(lists);
    });
});


// Archive list
describe(listActions.ARCHIVE_LIST_SUCCESS, () => {
    it('should set the list as "archived"', () => {
        const action = listActions.archiveListSuccessAction(state.board.lists[0]);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists[0].isArchived,
        ).toEqual(true);
    });
});

describe(`${listActions.ARCHIVE_LIST_SUCCESS}: inexistant list given`, () => {
    it('should send the previous state (nothing changed)', () => {
        const inexistantList = {
            _id: 'invalidListId',
            name: 'random list',
        };
        const action = listActions.archiveListSuccessAction(inexistantList);
        const finalState = currentBoardReducer(state, action);

        expect(finalState).toEqual(state);
    });
});


// ===== CARDS ACTIONS ===== //
// Edit description
describe(cardActions.EDIT_CARD_DESCRIPTION_STARTED, () => {
    it('should update the description with the given one', () => {
        const newDescription = 'this is a new description';
        const action = cardActions.editCardDescriptionStartedAction(card1, newDescription);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).description,
        ).toEqual(newDescription);
    });
});

describe(cardActions.EDIT_CARD_DESCRIPTION_FAILURE, () => {
    it('should update the description with the given one', () => {
        const oldDescription = 'this is a the old description';
        const action = cardActions.editCardDescriptionStartedAction(card1, oldDescription);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).description,
        ).toEqual(oldDescription);
    });
});


// Add label
describe(cardActions.ADD_LABEL_STARTED, () => {
    it('should add the label sent to the current ones', () => {
        const newLabel = labels[2];
        const action = cardActions.addLabelStartedAction(card1._id, newLabel._id);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).labels,
        ).toEqual(card1.labels.concat(newLabel));
    });
});

describe(cardActions.ADD_LABEL_FAILURE, () => {
    it('should remove the label sent to the current ones', () => {
        const labelAddFailed = card1.labels[1];
        const action = cardActions.addLabelFailureAction('An error occured', card1._id, labelAddFailed._id);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).labels,
        ).toEqual(card1.labels.filter(lab => lab._id !== labelAddFailed._id));
    });
});

// Delete label
describe(cardActions.DELETE_LABEL_STARTED, () => {
    it('should remove the label sent to the current ones', () => {
        const labelToRemove = card1.labels[0];
        const action = cardActions.deleteLabelStartedAction(card1._id, labelToRemove._id);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).labels,
        ).toEqual(card1.labels.filter(l => l._id !== labelToRemove._id));
    });
});

describe(`${cardActions.DELETE_LABEL_STARTED}: labelId given incorrect`, () => {
    it('should send the previous state (nothing deleted)', () => {
        const action = cardActions.deleteLabelStartedAction(card1._idn, 'anInvalidLabeId');
        const finalState = currentBoardReducer(state, action);

        expect(finalState).toEqual(state);
    });
});

describe(`${cardActions.DELETE_LABEL_STARTED}: cardId given incorrect`, () => {
    it('should send the previous state (nothing deleted)', () => {
        const labelToRemove = state.board.labels[0];
        const action = cardActions.deleteLabelStartedAction('anInvalidCardId', labelToRemove._id);
        const finalState = currentBoardReducer(state, action);

        expect(finalState).toEqual(state);
    });
});

describe(cardActions.DELETE_LABEL_FAILURE, () => {
    it('should append the label sent to the current ones', () => {
        const newLabel = state.board.labels[2];
        const action = cardActions.deleteLabelFailureAction('an error occured', card1._id, newLabel._id);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).labels,
        ).toEqual(card1.labels.concat(newLabel));
    });
});

// Archive card
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

describe(`${cardActions.ARCHIVE_CARD_SUCCESS}: inexistant card given`, () => {
    it('should send the previous state (nothing changed)', () => {
        const inexistantCard = {
            _id: 'anInvalidCardId',
            name: 'random card',
            list: { _id: 'anInvalidListId' },
        };
        const action = cardActions.archiveCardSuccessAction(inexistantCard);
        const finalState = currentBoardReducer(state, action);

        expect(finalState).toEqual(state);
    });
});
