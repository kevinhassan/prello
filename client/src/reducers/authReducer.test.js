import authReducer from './authReducer';
import * as actions from '../actions/auth';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        // Specify empty state
        expect(authReducer({}, {})).toEqual({});
    });
});

describe('auth/CLASSIC_SIGN_IN_SUCCESS reducer', () => {
    it('should mark the user as loggedIn in store and empty the errorSignInMessage', () => {
        const signInAction = actions.classicSignInSuccess('someToken');
        const finalState = authReducer({}, signInAction);

        expect(finalState.isLoggedIn).toEqual(true);
        expect(finalState.errorSignInMessage).toEqual('');
    });
});

describe('auth/CLASSIC_SIGN_IN_FAILURE reducer', () => {
    it('should update the error message', () => {
        const signInAction = actions.classicSignInFailure('error when signing up');
        const finalState = authReducer({}, signInAction);

        expect(finalState.errorSignInMessage).toEqual('error when signing up');
    });
});

describe('auth/CLASSIC_REGISTER_SUCCESS reducer', () => {
    it('should empty the errorRegisterMessage', () => {
        const registerSuccessAction = actions.classicRegisterSuccess();
        const finalState = authReducer({}, registerSuccessAction);

        expect(finalState.errorRegisterMessage).toEqual('');
    });
});

describe('auth/CLASSIC_REGISTER_FAILURE reducer', () => {
    it('should return an errorRegisterMessage', () => {
        const registerErrorAction = actions.classicRegisterFailure('error when registering');
        const finalState = authReducer({}, registerErrorAction);

        expect(finalState.errorRegisterMessage).toEqual('error when registering');
    });
});
