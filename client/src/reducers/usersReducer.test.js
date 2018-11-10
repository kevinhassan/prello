import usersReducer from './usersReducer';
import * as actions from '../actions/user';


describe(actions.GET_USER_INFORMATION_SUCCESS, () => {
    it('should update the state with the profile provided', () => {
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

describe(actions.UPDATE_USER_INFORMATION_STARTED, () => {
    it('should update the state with the profile provided', () => {
        const profile = {
            biography: 'A random student',
            fullName: 'Kévin Test',
            initials: 'KT',
        };
        const action = actions.updateUserInformationStartedAction(profile.fullName, profile.initials, profile.biography);
        const finalState = usersReducer({}, action);

        expect(finalState.user).toEqual(profile);
    });
});

describe(actions.UPDATE_USER_INFORMATION_FAILURE, () => {
    it('should update the state with the profile provided', () => {
        const profile = {
            biography: 'A random student',
            fullName: 'Kévin Test',
            initials: 'KT',
        };
        const action = actions.updateUserInformationFailureAction(profile.fullName, profile.initials, profile.biography);
        const finalState = usersReducer({}, action);

        expect(finalState.user).toEqual(profile);
    });
});
