import * as actions from '../actions/boards';
import * as listActions from '../actions/lists';
import * as cardActions from '../actions/cards';
import currentBoardReducer, { initialState } from './currentBoardReducer';

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
    dueDate: '2000-01-01',
};
const card2 = {
    _id: 'c2',
    name: 'card2',
    labels: [labels[0]],
    dueDate: '2018-11-15',
};
const card3 = {
    _id: 'c3',
    name: 'card3',
    labels: [],
    list: { _id: 'l3' },
    dueDate: '2019-01-19',
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
    errorMessage: '',
    status: null,
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
describe(actions.FETCH_BOARD_STARTED, () => {
    it('should reinitialiaze the state (undefined or empty value)', () => {
        const action = actions.fetchBoardStartedAction();
        const finalState = currentBoardReducer(initialState, action);

        expect(finalState.board).toEqual(undefined);
        expect(finalState.errorMessage).toEqual('');
        expect(finalState.status).toEqual(null);
    });
});

describe(actions.FETCH_BOARD_SUCCESS, () => {
    it('should put the new board in state', () => {
        const newBoard = { _id: 'newBoardI', name: 'new board', lists: [] };
        const action = actions.fetchBoardSuccessAction(newBoard);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board).toEqual(newBoard);
    });
});

describe(actions.FETCH_BOARD_FAILURE, () => {
    it('should set the board to null, set the errorMessage and status', () => {
        const error = { message: 'an error', status: 404 };
        const action = actions.fetchBoardFailureAction(error.message, error.status);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board).toEqual(null);
        expect(finalState.errorMessage).toEqual(error.message);
        expect(finalState.status).toEqual(error.status);
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

describe(actions.UPDATE_BOARD_NAME_STARTED, () => {
    it('should correctly change the board name', () => {
        const name = 'a new board name';
        const action = actions.updateBoardNameStartedAction(state.board._id, name);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.name).toEqual(name);
    });
});

describe(`${actions.UPDATE_BOARD_NAME_STARTED}: not current board id`, () => {
    it('if the id provided is not the current board one, should do nothing and return the current state', () => {
        const name = 'a new board name';
        const action = actions.updateBoardNameStartedAction('aRandomId', name);
        const finalState = currentBoardReducer(state, action);
        expect(finalState.board).toEqual(state.board);
    });
});

describe(actions.UPDATE_BOARD_NAME_FAILURE, () => {
    it('should correctly change the board name to the old one provided', () => {
        const name = 'an old board name';
        const action = actions.updateBoardNameFailureAction(state.board._id, name);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.name).toEqual(name);
    });
});

describe(actions.ADD_BOARD_MEMBER_SUCCESS, () => {
    it('should add the member to the board', () => {
        const username = 'a new member';
        const action = actions.addBoardMemberSuccessAction(state.board._id, username);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.members.length).toEqual(state.board.members.length + 1);
    });
});

describe(`${actions.UPDATE_BOARD_NAME_FAILURE}: not current board id`, () => {
    it('if the id provided is not the current board one, should do nothing and return the current state', () => {
        const name = 'an old board name';
        const action = actions.updateBoardNameFailureAction('aRandomId', name);
        const finalState = currentBoardReducer(state, action);
        expect(finalState.board).toEqual(state.board);
    });
});

describe(`${actions.UPDATE_BOARD_GITHUB_STARTED}`, () => {
    it('should add the github repo to the board', () => {
        const githubRepo = {
            name: 'My repo',
            private: false,
            url: 'http://localhost:1234',
        };
        const action = actions.updateBoardGithubStartedAction(state.board._id, githubRepo);
        const finalState = currentBoardReducer(state, action);
        expect(finalState.board.githubRepo).toEqual(githubRepo);
    });
});

describe(actions.UPDATE_BOARD_GITHUB_FAILURE, () => {
    it('should add the github repo to the board', () => {
        const githubRepo = {
            name: 'My failure repo',
            private: false,
            url: 'http://locsalhost:1234',
        };
        const action = actions.updateBoardGithubFailureAction(state.board._id, githubRepo);
        const finalState = currentBoardReducer(state, action);
        expect(finalState.board.githubRepo).toEqual(githubRepo);
    });
});

describe(`${actions.UPDATE_BOARD_GITHUB_FAILURE}: incorrect board id`, () => {
    it('should do nothing on the state', () => {
        const githubRepo = {
            name: 'My failure repo',
            private: false,
            url: 'http://locsalhost:1234',
        };

        const action = actions.updateBoardGithubFailureAction('aRandomId', githubRepo);
        const finalState = currentBoardReducer(state, action);
        expect(finalState).toEqual(state);
    });
});

describe(actions.REMOVE_BOARD_GITHUB_SUCCESS, () => {
    it('should remove the github repo from the board', () => {
        const action = actions.removeBoardGithubSuccessAction(state.board._id);
        const finalState = currentBoardReducer(state, action);
        expect(finalState.board.githubRepo).toEqual({});
    });
});

describe(actions.CREATE_LABEL_SUCCESS, () => {
    it('should add the label to the board', () => {
        const label = {
            name: 'a new label',
            color: '#005243',
        };
        const action = actions.createLabelSuccessAction(label.name, label.color, state.board._id);
        const finalState = currentBoardReducer(state, action);
        expect(finalState.board.labels.length).toEqual(state.board.labels.length + 1);
        expect(finalState.board.labels.find(l => l.name === label.name));
    });
});

describe(actions.DELETE_BOARD_LABEL_SUCCESS, () => {
    it('should delete the label from the board', () => {
        const labelToRemove = state.board.labels[0];
        const action = actions.deleteBoardLabelSuccessAction(labelToRemove._id);
        const finalState = currentBoardReducer(state, action);

        const finalCards = finalState.board.lists.map(l => l.cards.map(c => c));

        const finalCardsFlat = [].concat(...finalCards);
        const finalLabels = finalCardsFlat.map(card => card.labels.map(l => l));

        expect(finalState.board.labels.length).toEqual(state.board.labels.length - 1);
        expect(finalState.board.labels.find(l => l._id === labelToRemove._id)).toEqual(undefined);
        expect(!finalLabels.includes(labelToRemove._id));
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
        const action = listActions.moveCardFailureAction(lists);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists).toEqual(lists);
    });
});


// Archive list
describe(listActions.ARCHIVE_LIST_SUCCESS, () => {
    it('should set the list as "archived"', () => {
        const action = listActions.archiveListSuccessAction(state.board.lists[0], true);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists[0].isArchived,
        ).toEqual(true);
    });
});

describe(listActions.ARCHIVE_LIST_SUCCESS, () => {
    it('should set the list as "not archived"', () => {
        const action = listActions.archiveListSuccessAction(state.board.lists[0], false);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists[0].isArchived,
        ).toEqual(false);
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

// Update name
describe(listActions.UPDATE_LIST_NAME_STARTED, () => {
    it('should set the list name', () => {
        const name = 'My tested list name';
        const action = listActions.updateListNameStartedAction(state.board.lists[0]._id, name);
        const finalState = currentBoardReducer(state, action);

        expect(finalState.board.lists[0].name).toEqual(name);
    });
});

describe(listActions.UPDATE_LIST_NAME_FAILURE, () => {
    it('should set the list name', () => {
        const name = 'My tested list name';
        const action = listActions.updateListNameFailureAction(state.board.lists[0]._id, name);
        const finalState = currentBoardReducer(state, action);
        expect(finalState.board.lists[0].name).toEqual(name);
    });
});

// ===== CARDS ACTIONS ===== //

// Edit name
describe(cardActions.EDIT_CARD_NAME_STARTED, () => {
    it('should update the name with the given one', () => {
        const newName = 'this is a new name';
        const action = cardActions.editCardNameStartedAction(card1, newName);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).name,
        ).toEqual(newName);
    });
});

describe(cardActions.EDIT_CARD_NAME_FAILURE, () => {
    it('should update the name with the given one', () => {
        const oldName = 'this is a the old name';
        const action = cardActions.editCardNameFailureAction(card1, oldName);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).name,
        ).toEqual(oldName);
    });
});

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
        const action = cardActions.editCardDescriptionFailureAction(card1, oldDescription);
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
        const action = cardActions.addLabelFailureAction(card1._id, labelAddFailed._id);
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
        const action = cardActions.deleteLabelFailureAction(card1._id, newLabel._id);
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
        const action = cardActions.archiveCardSuccessAction(card3, true);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card3.list._id)
                .cards.find(c => c._id === card3._id).isArchived,
        ).toEqual(true);
    });
});

describe(cardActions.ARCHIVE_CARD_SUCCESS, () => {
    it('should set the card as "archived"', () => {
        const action = cardActions.archiveCardSuccessAction(card3, false);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card3.list._id)
                .cards.find(c => c._id === card3._id).isArchived,
        ).toEqual(false);
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

// Edit due date
describe(cardActions.EDIT_DUE_DATE_STARTED, () => {
    it('should update the due date with the given one', () => {
        const newDate = '2018-11-12';
        const action = cardActions.editDateStartedAction(card1, newDate);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).dueDate,
        ).toEqual(newDate);
    });
});

describe(cardActions.EDIT_CARD_DESCRIPTION_FAILURE, () => {
    it('should update the due date with the old one', () => {
        const initialDate = '2000-01-01';
        const action = cardActions.editDateFailureAction(card1, initialDate);
        const finalState = currentBoardReducer(state, action);

        expect(
            finalState.board.lists.find(l => l._id === card1.list._id)
                .cards.find(c => c._id === card1._id).dueDate,
        ).toEqual(initialDate);
    });
});
