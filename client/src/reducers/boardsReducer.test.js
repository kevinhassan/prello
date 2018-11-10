import boardsReducer, { initialState } from './boardsReducer';
import * as actions from '../actions/boards';

describe('Action not referenced', () => {
    it('should return the current state', () => {
        const finalState = boardsReducer();
        expect(finalState).toEqual(initialState);
        const finalState2 = boardsReducer(initialState, { type: 'notReferencedAction ' });
        expect(finalState2).toEqual(initialState);
    });
});

describe(actions.FETCH_BOARDS_SUCCESS, () => {
    it('should update the boards with the fetched one', () => {
        const boards = {
            boards: [
                {
                    _id: 'b1',
                    name: 'Board n1',
                },
                {
                    _id: 'b2',
                    name: 'Board n2',
                },
            ],
        };
        const action = actions.fetchBoardsSuccessAction(boards);
        const finalState = boardsReducer({}, action);

        expect(finalState).toEqual({ userBoards: boards });
    });
});

describe(actions.FETCH_BOARDS_FAILURE, () => {
    it('should return the current state', () => {
        const boards = {
            boards: [
                {
                    _id: 'b1',
                    name: 'Board n1',
                },
                {
                    _id: 'b2',
                    name: 'Board n2',
                },
            ],
        };
        const action = actions.fetchBoardsFailureAction();
        const finalState = boardsReducer({ userBoards: boards }, action);

        expect(finalState).toEqual({ userBoards: boards });
    });
});
