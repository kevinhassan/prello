import boardReducer from './boardReducer';
import * as actions from '../actions/board';
import List from '../models/List';

describe('board reducer', () => {
    it('should return the initial state', () => {
        // Specify empty state
        expect(boardReducer({}, {})).toEqual({});
    });
});

describe('board/UPDATE_LISTS_INDEXES_SUCCESS reducer', () => {
    it('should update the lists with the provided ones', () => {
        const lists = [new List({ _id: 1 }), new List({ _id: 2 }), new List({ _id: 3 })];
        const updateAction = actions.updateListsIndexesSuccessAction(lists);
        const finalState = boardReducer({}, updateAction);

        expect(finalState.board.lists.length).toEqual(3);
        expect(finalState.board.lists[2]._id).toEqual(3);
    });
});
