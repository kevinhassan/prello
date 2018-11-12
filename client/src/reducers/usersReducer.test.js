import usersReducer, { initialState } from './usersReducer';
import * as actions from '../actions/user';
import * as teamActions from '../actions/teams';

describe('Action not referenced', () => {
    it('should return the current state', () => {
        const finalState = usersReducer();
        expect(finalState).toEqual(initialState);
        const finalState2 = usersReducer({}, { type: 'notReferencedAction ' });
        expect(finalState2).toEqual(initialState);
    });
});

describe(actions.GET_PROFILE_SUCCESS, () => {
    it('should update the state with the profile provided', () => {
        const profile = {
            biograhy: 'A random student',
            email: 'kevin@test.com',
            fullName: 'Kévin Test',
            initial: 'KT',
            username: 'kevintest1',
        };
        const action = actions.getProfileSuccessAction(profile);
        const finalState = usersReducer({}, action);

        expect(finalState.profile).toEqual(profile);
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

        expect(finalState.profile).toEqual(profile);
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

        expect(finalState.profile).toEqual(profile);
    });
});

describe(actions.GET_USER_INFORMATION_SUCCESS, () => {
    it('should update the user with the profile provided', () => {
        const user = {
            biography: 'A random student',
            fullName: 'Kévin Test',
            initials: 'KT',
        };
        const action = actions.getUserInformationSuccessAction(user);
        const finalState = usersReducer({}, action);

        expect(finalState.user).toEqual(user);
    });
});

describe(teamActions.CREATE_TEAM_SUCCESS, () => {
    it('should append the team to the current ones', () => {
        const team = {
            name: 'A test team',
            isVisible: true,
        };
        const action = teamActions.createTeamSuccessAction(team);
        const finalState = usersReducer({}, action);

        expect(finalState.profile.teams).toEqual(initialState.teams.concat(team));
    });
});
