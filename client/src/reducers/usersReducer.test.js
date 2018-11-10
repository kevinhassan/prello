import usersReducer from './usersReducer';
import * as actions from '../actions/user';


describe(actions.GET_USER_INFORMATION_SUCCESS, () => {
    it('should update the state with profile provided', () => {
        const profile = {
            biograhy: 'A random student',
            email: 'kevin@test.com',
            fullName: 'Kévin Test',
            initial: 'KT',
            username: 'kevintest1',
        };
        const action = actions.getUserInformationSuccessAction(profile);
        const finalState = usersReducer({}, action);

        expect(finalState.user).toEqual(profile);
    });
});
