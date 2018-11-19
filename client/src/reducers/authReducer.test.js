import authReducer, { initialState, getToken, parseJwtToId } from './authReducer';
import * as actions from '../actions/auth';

describe('Action not referenced', () => {
    it('should return the current state', () => {
        const finalState = authReducer();
        expect(finalState).toEqual(initialState);
        const finalState2 = authReducer({ type: 'notReferencedAction ' }, initialState);
        expect(finalState2).toEqual(initialState);
    });
});

describe('Testing getToken function', () => {
    it('should return the token from the local storage', () => {
        const token = 'aRandomToken';
        localStorage.setItem('prello_token', token);
        expect(getToken()).toEqual(token);
    });
    it('should return {} if token not found', () => {
        localStorage.removeItem('prello_token');
        expect(getToken()).toEqual(null);
    });
});

describe('Testing parseJwtToId function', () => {
    it('should return null if no token is provided', () => {
        expect(parseJwtToId()).toEqual(null);
    });
    it('should return the id stored in the token', () => {
        // JWT with id= 1234567890
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
        token += '.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9';
        token += '.Wp55KRKfBmD9oafN8DRB0g0CWp7baHpij2stsEz5Gzw';
        expect(parseJwtToId(token)).toEqual('1234567890');
    });
});

describe(actions.CLASSIC_SIGN_IN_SUCCESS, () => {
    it('should mark the user as loggedIn in store and empty the errorSignInMessage', () => {
        const signInAction = actions.classicSignInSuccessAction('someToken');
        const finalState = authReducer(signInAction, {});

        expect(finalState.isLoggedIn).toEqual(true);
        expect(finalState.errorSignInMessage).toEqual('');
    });
});

describe(actions.CLASSIC_SIGN_IN_FAILURE, () => {
    it('should update the error message', () => {
        const signInAction = actions.classicSignInFailureAction('error when signing up');
        const finalState = authReducer(signInAction, {});

        expect(finalState.errorSignInMessage).toEqual('error when signing up');
    });
});

describe(actions.CLASSIC_REGISTER_SUCCESS, () => {
    it('should empty the errorRegisterMessage', () => {
        const registerSuccessAction = actions.classicRegisterSuccessAction();
        const finalState = authReducer(registerSuccessAction, {});

        expect(finalState.errorRegisterMessage).toEqual('');
    });
});

describe(actions.CLASSIC_REGISTER_FAILURE, () => {
    it('should return an errorRegisterMessage', () => {
        const registerErrorAction = actions.classicRegisterFailureAction('error when registering');
        const finalState = authReducer(registerErrorAction, {});

        expect(finalState.errorRegisterMessage).toEqual('error when registering');
    });
});

describe(actions.SIGN_OUT, () => {
    it('should set isLoggedIn to false and clientId to null', () => {
        const action = actions.signOutAction();
        const finalState = authReducer(action, {});

        expect(finalState.isLoggedIn).toEqual(false);
        expect(finalState.clientId).toEqual(null);
    });
});
