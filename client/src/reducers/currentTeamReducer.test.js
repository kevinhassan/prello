import currentTeamReducer, { initialState } from './currentTeamReducer';
import * as actions from '../actions/teams';

describe('Action not referenced', () => {
    it('should return the current state', () => {
        const finalState = currentTeamReducer();
        expect(finalState).toEqual(initialState);
        const finalState2 = currentTeamReducer(initialState, { type: 'notReferencedAction ' });
        expect(finalState2).toEqual(initialState);
    });
});

describe(actions.FETCH_TEAM_SUCCESS, () => {
    it('should put the team fetched in the state', () => {
        const team = {
            _id: 't1',
            name: 'Awesome team',
            description: 'this is a team',
        };
        const action = actions.fetchTeamSuccessAction(team);
        const finalState = currentTeamReducer({}, action);

        expect(finalState.team).toEqual(team);
    });
});

describe(actions.ADD_MEMBER_TO_TEAM_SUCCESS, () => {
    it('should put the team updated in the state', () => {
        const team = {
            _id: 't2',
            name: 'Awesome team updated',
            description: 'this is a team',
        };
        const action = actions.addMemberToTeamSuccessAction(team);
        const finalState = currentTeamReducer({}, action);

        expect(finalState.team).toEqual(team);
    });
});
