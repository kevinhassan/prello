import authReducer from './authReducer';
import * as actions from '../actions/auth';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        // Specify empty state
        expect(authReducer({}, {})).toEqual({});
    });
});

describe('auth/CLASSIC_SIGN_IN_SUCCESS reducer', () => {
    it('should mark the user as loggedIn in store', () => {
        const signInAction = actions.classicSignInSuccess('someToken');
        const finalState = authReducer({}, signInAction);

        expect(finalState.isLoggedIn).toEqual(true);
    });
});

describe('auth/CLASSIC_SIGN_IN_FAILURE reducer', () => {
    it('should update the error message', () => {
        const signInAction = actions.classicSignInFailure('error when signing up');
        const finalState = authReducer({}, signInAction);

        expect(finalState.errorSignInMessage).toEqual('error when signing up');
    });
});
