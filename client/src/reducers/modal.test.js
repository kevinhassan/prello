import modalReducer from './modalReducer';
import * as actions from '../actions/modal';

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
