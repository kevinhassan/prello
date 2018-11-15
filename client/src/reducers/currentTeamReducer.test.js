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

describe(actions.FETCH_TEAM_FAILURE, () => {
    it('should set the team to null', () => {
        const action = actions.fetchTeamFailureAction();
        const finalState = currentTeamReducer({}, action);

        expect(finalState.team).toEqual(null);
    });
});

describe(actions.FETCH_TEAM_STARTED, () => {
    it('should set the team to undefined', () => {
        const action = actions.fetchTeamStartedAction();
        const finalState = currentTeamReducer({}, action);

        expect(finalState.team).toEqual(undefined);
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
describe(actions.CHANGE_VISIBILITY_TEAM_SUCCESS, () => {
    it('should put the team visibility updated in the state', () => {
        const team = {
            _id: 't2',
            name: 'Awesome team updated',
            description: 'this is a team',
            visibility: true,
        };
        const action = actions.changeVisibilityTeamSuccessAction(!team.visibility);
        const finalState = currentTeamReducer({}, action);

        expect(finalState.team.isVisible).not.toEqual(team.isVisible);
    });
});
describe(actions.DELETE_MEMBER_SUCCESS, () => {
    it('should delete member of the team in the state', () => {
        const members = [{
            _id: 'u00000000001',
        }, {
            _id: 'u00000000002',
        }];
        const state = {
            team: {
                _id: 't2',
                members: [...members],
                admins: [{
                    _id: 'u00000000001',
                }],
                description: 'this is a team',
                visibility: true,
            },
        };
        const action = actions.deleteMemberSuccessAction(members[1]);
        const finalState = currentTeamReducer(state, action);
        expect(finalState.team.members).not.toEqual(members);
    });

    it('should delete admin member of the team in the state', () => {
        const members = [{
            _id: 'u00000000001',
        }, {
            _id: 'u00000000002',
        }];
        const admins = [{
            _id: 'u00000000001',
        }, {
            _id: 'u00000000002',
        }];
        const state = {
            team: {
                _id: 't2',
                members: [...members],
                admins: [...admins],
                description: 'this is a team',
                visibility: true,
            },
        };
        const action = actions.deleteMemberSuccessAction(members[1]);
        const finalState = currentTeamReducer(state, action);
        expect(finalState.team.members).not.toEqual(members);
        expect(finalState.team.admins).not.toEqual(admins);
    });
});
