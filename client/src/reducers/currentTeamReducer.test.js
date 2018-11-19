import currentTeamReducer, { initialState } from './currentTeamReducer';
import * as actions from '../actions/teams';

describe('Action not referenced', () => {
    it('should return the current state', () => {
        const finalState = currentTeamReducer();
        expect(finalState).toEqual(initialState);
        const finalState2 = currentTeamReducer({ type: 'notReferencedAction ' }, initialState);
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
        const finalState = currentTeamReducer(action, {});

        expect(finalState.team).toEqual(team);
    });
});

describe(actions.FETCH_TEAM_FAILURE, () => {
    it('should set the team to null', () => {
        const action = actions.fetchTeamFailureAction();
        const finalState = currentTeamReducer(action, {});

        expect(finalState.team).toEqual(null);
    });
});

describe(actions.FETCH_TEAM_STARTED, () => {
    it('should set the team to undefined', () => {
        const action = actions.fetchTeamStartedAction();
        const finalState = currentTeamReducer(action, {});

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
        const finalState = currentTeamReducer(action, {});

        expect(finalState.team).toEqual(team);
    });
});
describe(actions.CHANGE_TEAM_VISIBILITY_SUCCESS, () => {
    it('should put the team visibility updated in the state', () => {
        const team = {
            _id: 't2',
            name: 'Awesome team updated',
            description: 'this is a team',
            visibility: true,
        };
        const action = actions.changeTeamVisibilitySuccessAction(!team.visibility);
        const finalState = currentTeamReducer(action, {});

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
        const finalState = currentTeamReducer(action, state);
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
        const finalState = currentTeamReducer(action, state);
        expect(finalState.team.members).not.toEqual(members);
        expect(finalState.team.admins).not.toEqual(admins);
    });
});

describe(actions.CHANGE_TEAM_NAME_SUCCESS, () => {
    it('should set the team name', () => {
        const state = {
            team: {
                _id: 't2',
                members: [],
                admins: [],
                name: 'My team',
                description: 'this is a team',
                visibility: true,
            },
        };
        const newName = 'A new team name';
        const action = actions.changeTeamNameSuccessAction(newName);
        const finalState = currentTeamReducer(action, state);

        expect(finalState.team.name).toEqual(newName);
    });
});

describe(actions.CHANGE_TEAM_DESCRIPTION_SUCCESS, () => {
    it('should set the team description', () => {
        const state = {
            team: {
                _id: 't2',
                members: [],
                admins: [],
                description: 'this is a team',
                visibility: true,
            },
        };
        const newDescription = 'A new description';
        const action = actions.changeTeamDescriptionSuccessAction(newDescription);
        const finalState = currentTeamReducer(action, state);

        expect(finalState.team.description).toEqual(newDescription);
    });
});

describe(actions.EDIT_MEMBER_RIGHT_SUCCESS, () => {
    it('should set the member right to admin', () => {
        const members = [{
            _id: 'u00000000001',
            isAdmin: false,
        }, {
            _id: 'u00000000002',
            isAdmin: true,
        }];
        const admins = [{
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
        const action = actions.editMemberRightSuccessAction(members[0]);
        const finalState = currentTeamReducer(action, state);

        expect(finalState.team.admins.some(a => a._id === members[0]._id));
        expect(finalState.team.members[0].isAdmin);
    });

    it('should set the admin right to member', () => {
        const members = [{
            _id: 'u00000000001',
            isAdmin: false,
        }, {
            _id: 'u00000000002',
            isAdmin: true,
        }];
        const admins = [{
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
        const action = actions.editMemberRightSuccessAction(members[1]);
        const finalState = currentTeamReducer(action, state);

        expect(!finalState.team.admins.some(a => a._id === members[1]._id));
        expect(!finalState.team.members[1].isAdmin);
    });
});
