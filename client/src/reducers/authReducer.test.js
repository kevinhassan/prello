import authReducer, { initialState } from './authReducer';
import * as actions from '../actions/auth';

describe('Action not referenced', () => {
    it('should return the current state', () => {
        const finalState = authReducer();
        expect(finalState).toEqual(initialState);
        const finalState2 = authReducer(initialState, { type: 'notReferencedAction ' });
        expect(finalState2).toEqual(initialState);
    });
});

describe(actions.CLASSIC_SIGN_IN_SUCCESS, () => {
    it('should mark the user as loggedIn in store and empty the errorSignInMessage', () => {
        const signInAction = actions.classicSignInSuccessAction('someToken');
        const finalState = authReducer({}, signInAction);

        expect(finalState.isLoggedIn).toEqual(true);
        expect(finalState.errorSignInMessage).toEqual('');
    });
});

describe(actions.CLASSIC_SIGN_IN_FAILURE, () => {
    it('should update the error message', () => {
        const signInAction = actions.classicSignInFailureAction('error when signing up');
        const finalState = authReducer({}, signInAction);

        expect(finalState.errorSignInMessage).toEqual('error when signing up');
    });
});

describe(actions.CLASSIC_REGISTER_SUCCESS, () => {
    it('should empty the errorRegisterMessage', () => {
        const registerSuccessAction = actions.classicRegisterSuccessAction();
        const finalState = authReducer({}, registerSuccessAction);

        expect(finalState.errorRegisterMessage).toEqual('');
    });
});

describe(actions.CLASSIC_REGISTER_FAILURE, () => {
    it('should return an errorRegisterMessage', () => {
        const registerErrorAction = actions.classicRegisterFailureAction('error when registering');
        const finalState = authReducer({}, registerErrorAction);

        expect(finalState.errorRegisterMessage).toEqual('error when registering');
    });
});

describe(actions.SIGN_OUT, () => {
    it('should set isLoggedIn to false', () => {
        const action = actions.signOutAction();
        const finalState = authReducer({}, action);

        expect(finalState.isLoggedIn).toEqual(false);
    });
});
