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
        case actions.CHANGE_TEAM_VISIBILITY_SUCCESS:
            return {
                ...state,
                team: {
                    ...state.team,
                    isVisible: action.payload.isVisible,
                },
            };
        case actions.CHANGE_TEAM_NAME_SUCCESS:
            return {
                ...state,
                team: {
                    ...state.team,
                    name: action.payload.name,
                },
            };
        case actions.CHANGE_TEAM_DESCRIPTION_SUCCESS:
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
        case actions.EDIT_MEMBER_RIGHT_SUCCESS:
            const editedMember = action.payload.member;
            // if member access is false remove him from admins collection and update from member
            // else add him to admins collection
            return {
                ...state,
                team: {
                    ...state.team,
                    admins: editedMember.isAdmin ? state.team.admins.concat({
                        _id: editedMember._id, username: editedMember.username,
                    }) : state.team.admins.filter(admin => admin._id !== editedMember._id),
                    members: state.team.members.map(member => (member._id.toString() === editedMember._id.toString() ? editedMember : member)),
                },
            };
        default:
            return state;
        }
    }
    return state;
}
