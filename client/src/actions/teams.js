import * as APIFetch from '../helpers/APIFetch';
import {
    displayLoadingModal, hideLoadingModal, displayErrorMessage,
} from './modal';

// ========================

// ===== Create team ===== //
export const FETCH_TEAM_STARTED = 'teams/FETCH_TEAM_STARTED';
export const FETCH_TEAM_FAILURE = 'teams/FETCH_TEAM_FAILURE';
export const FETCH_TEAM_SUCCESS = 'teams/FETCH_TEAM_SUCCESS';

export const fetchTeamStartedAction = () => ({ type: FETCH_TEAM_STARTED });

export const fetchTeamFailureAction = () => ({ type: FETCH_TEAM_FAILURE });

export const fetchTeamSuccessAction = team => ({
    type: FETCH_TEAM_SUCCESS,
    payload: {
        team,
    },
});

export const fetchTeam = team => (dispatch) => {
    dispatch(fetchTeamStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'teams/'.concat(team);
    APIFetch.fetchPrelloAPI(resource)
        .then((res) => {
            dispatch(fetchTeamSuccessAction(res.data.team));
        })
        .catch((error) => {
            dispatch(fetchTeamFailureAction(error.response.data.error));
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Add member ===== //
export const ADD_MEMBER_TO_TEAM_STARTED = 'teams/ADD_MEMBER_TO_TEAM_STARTED';
export const ADD_MEMBER_TO_TEAM_FAILURE = 'teams/ADD_MEMBER_TO_TEAM_FAILURE';
export const ADD_MEMBER_TO_TEAM_SUCCESS = 'teams/ADD_MEMBER_TO_TEAM_SUCCESS';

export const addMemberToTeamStartedAction = () => ({ type: ADD_MEMBER_TO_TEAM_STARTED });

export const addMemberToTeamFailureAction = () => ({ type: ADD_MEMBER_TO_TEAM_FAILURE });

export const addMemberToTeamSuccessAction = team => ({
    type: ADD_MEMBER_TO_TEAM_SUCCESS,
    payload: {
        team,
    },
});

export const addMemberToTeam = (teamId, username) => (dispatch) => {
    dispatch(addMemberToTeamStartedAction());
    dispatch(displayLoadingModal());
    const resource = `teams/${teamId}/members`;
    APIFetch.fetchPrelloAPI(resource, { username }, APIFetch.POST)
        .then((res) => {
            dispatch(addMemberToTeamSuccessAction(res.data.team));
        })
        .catch((error) => {
            dispatch(addMemberToTeamFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
