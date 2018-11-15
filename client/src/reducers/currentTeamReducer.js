import * as actions from '../actions/teams';

export const initialState = {
    team: undefined,
};

export default function currentTeamReducer(state = initialState, action) {
    if (action) {
        switch (action.type) {
        case actions.FETCH_TEAM_STARTED:
            return {
                ...state,
                team: undefined,
            };

        case actions.FETCH_TEAM_SUCCESS:
            return {
                ...state,
                team: action.payload.team,
            };

        case actions.FETCH_TEAM_FAILURE:
            return {
                ...state,
                team: null,
            };

        case actions.ADD_MEMBER_TO_TEAM_SUCCESS:
            return {
                ...state,
                team: action.payload.team,
            };
        case actions.CHANGE_VISIBILITY_TEAM_SUCCESS:
            return {
                ...state,
                team: {
                    ...state.team,
                    isVisible: action.payload.isVisible,
                },
            };
        case actions.CHANGE_NAME_TEAM_SUCCESS:
            return {
                ...state,
                team: {
                    ...state.team,
                    name: action.payload.name,
                },
            };
        case actions.CHANGE_DESCRIPTION_TEAM_SUCCESS:
            return {
                ...state,
                team: {
                    ...state.team,
                    description: action.payload.description,
                },
            };
        case actions.DELETE_MEMBER_SUCCESS:
            const user = action.payload.member;
            return {
                ...state,
                team: {
                    ...state.team,
                    admins: state.team.admins.filter(admin => admin._id.toString() !== user._id.toString()),
                    members: state.team.members.filter(member => member._id.toString() !== user._id.toString()),
                },
            };
        default:
            return state;
        }
    }
    return state;
}
