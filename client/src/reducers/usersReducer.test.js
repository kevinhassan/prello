import usersReducer from './usersReducer';
import * as actions from '../actions/user';

describe('users reducer', () => {
    it('should return the initial state', () => {
        // Specify empty state
        expect(usersReducer({}, {})).toEqual({});
    });
});

describe('auth/USER_INFORMATIONS_SUCCESS reducer', () => {
    it('should ?', () => {
        const getInfoAction = actions.getUserInformation();
        const finalState = usersReducer({}, getInfoAction);

        expect(finalState.user).toEqual(undefined);
    });
})