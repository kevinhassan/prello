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

describe(actions.DISPLAY_LOADING_MODAL, () => {
    it('should set isModalOpen to true', () => {
        const action = actions.displayLoadingModalAction();
        const finalState = modalReducer({}, action);

        expect(finalState.isLoadingModalOpen).toEqual(true);
    });
});

describe(actions.HIDE_LOADING_MODAL, () => {
    it('should set isModalOpen to false', () => {
        const action = actions.hideLoadingModalAction();
        const finalState = modalReducer({}, action);

        expect(finalState.isLoadingModalOpen).toEqual(false);
    });
});

describe(actions.DISPLAY_ERROR_MESSAGE_MODAL, () => {
    it('should set an error message', () => {
        const action = actions.displayErrorMessageAction('an error occured');
        const finalState = modalReducer({}, action);

        expect(finalState.errorMessage).toEqual('an error occured');
    });
});

describe(actions.HIDE_ERROR_MESSAGE_MODAL, () => {
    it('should reset the error message', () => {
        const action = actions.hideErrorMessageAction();
        const finalState = modalReducer({}, action);

        expect(finalState.errorMessage).toEqual('');
    });
});

describe(actions.DISPLAY_SUCCESS_MESSAGE_MODAL, () => {
    it('should set a success message', () => {
        const action = actions.displaySuccessMessageAction('Testing success message modal');
        const finalState = modalReducer({}, action);

        expect(finalState.successMessage).toEqual('Testing success message modal');
    });
});

describe(actions.HIDE_SUCCESS_MESSAGE_MODAL, () => {
    it('should reset the success message', () => {
        const action = actions.hideSuccessMessageAction();
        const finalState = modalReducer({}, action);

        expect(finalState.successMessage).toEqual('');
    });
});
