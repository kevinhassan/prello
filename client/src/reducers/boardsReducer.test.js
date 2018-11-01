import boardsReducer from './boardsReducer';
import * as actions from '../actions/boards';
import List from '../models/List';

describe('board reducer', () => {
    it('should return the initial state', () => {
        // Specify empty state
        expect(boardsReducer({}, {})).toEqual({});
    });
});

describe('board/UPDATE_LISTS_INDEXES_SUCCESS reducer', () => {
    it('should update the lists with the provided ones', () => {
        const lists = [new List({ _id: 1 }), new List({ _id: 2 }), new List({ _id: 3 })];
        const updateAction = actions.updateListsIndexesSuccessAction(lists);
        const finalState = boardsReducer({}, updateAction);

        expect(finalState.board.lists.length).toEqual(3);
        expect(finalState.board.lists[2]._id).toEqual(3);
    });
});

describe('board/ADD_LIST_TO_BOARD_SUCCES reducer', () => {
    it('should update the lists with the new one', () => {
        const list = [new List({ _id: 1 })];
        const addListAction = actions.addListToBoardSuccess(list);
        const finalState = boardsReducer({}, addListAction);

        expect(finalState.board.lists.length).toEqual(1);
        expect(finalState.board.lists[0]._id).toEqual(1);
    });
});
