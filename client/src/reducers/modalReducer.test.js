import modalReducer, { initialState } from './modalReducer';
import * as actions from '../actions/modal';

describe('Action not referenced', () => {
    it('should return the current state', () => {
        const finalState = modalReducer();
        expect(finalState).toEqual(initialState);
        const finalState2 = modalReducer(initialState, { type: 'notReferencedAction ' });
        expect(finalState2).toEqual(initialState);
    });
});

describe('modal/DISPLAY_LOADING_MODAL', () => {
    it('should set isModalOpen to true', () => {
        const action = actions.displayLoadingModalAction();
        const finalState = modalReducer({}, action);
        expect(finalState.isLoadingModalOpen).toEqual(true);
    });
});

describe('modal/HIDE_LOADING_MODAL', () => {
    it('should set isModalOpen to false', () => {
        const action = actions.hideLoadingModalAction();
        const finalState = modalReducer({}, action);
        expect(finalState.isLoadingModalOpen).toEqual(false);
    });
});
