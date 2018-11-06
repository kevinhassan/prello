import * as actions from '../actions/teams';

export const initialState = {
  team: undefined,
};

export default function currentTeamReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_TEAM_SUCCESS:
      return {
        ...state,
        team: action.payload.team,
      };

    case actions.FETCH_TEAM_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
