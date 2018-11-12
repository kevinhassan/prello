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

        default:
            return state;
        }
    }
    return state;
}
