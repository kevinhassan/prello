import * as actions from '../actions/boards';
import boardsReducer, { initialState } from './boardsReducer';

describe('Action not referenced', () => {
    it('should return the current state', () => {
        const finalState = boardsReducer();
        expect(finalState).toEqual(initialState);
        const finalState2 = boardsReducer({ type: 'notReferencedAction ' }, initialState);
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
        const finalState = boardsReducer(action, {});

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
        const finalState = boardsReducer(action, { userBoards: boards });

        expect(finalState).toEqual({ userBoards: boards });
    });
});

describe(actions.UPDATE_IS_ARCHIVED_SUCCESS, () => {
    it('should update the board isArchived property', () => {
        const action = actions.updateIsArchivedSuccessAction('b1', true);
        const finalState = boardsReducer(action, { userBoards: [{ _id: 'b1', isArchived: false }] });
        expect(finalState.userBoards[0].isArchived).toEqual(true);
    });
});

describe(`${actions.UPDATE_IS_ARCHIVED_SUCCESS}: inexisting board`, () => {
    it('should return the previous state (nothing changed)', () => {
        const action = actions.updateIsArchivedSuccessAction('falseBoardId123', true);
        const finalState = boardsReducer(action, { userBoards: [{ _id: 'b1', isArchived: false }] });
        expect(finalState.userBoards[0].isArchived).toEqual(false);
    });
});

describe(actions.CREATE_BOARD_SUCCESS, () => {
    it('should add the board to the state', () => {
        const newBoard = {
            isArchived: false,
            name: 'new board',
            visibility: 'team',
            labels: [],
            lists: [],
        };
        const action = actions.createBoardSuccessAction(newBoard);
        const finalState = boardsReducer(action, { userBoards: [{ _id: 'b1', isArchived: false }] });

        expect(finalState.userBoards.length).toEqual(2);
    });
});
