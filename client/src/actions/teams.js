import * as APIFetch from '../helpers/APIFetch';
import {
    displayLoadingModal, hideLoadingModal, displayErrorMessage,
} from './modal';

// ========================

// ===== Fetch team ===== //
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
            dispatch(fetchTeamFailureAction());
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

// ===== Create team ===== //
export const CREATE_TEAM_STARTED = 'teams/CREATE_TEAM_STARTED';
export const CREATE_TEAM_FAILURE = 'teams/CREATE_TEAM_FAILURE';
export const CREATE_TEAM_SUCCESS = 'teams/CREATE_TEAM_SUCCESS';

export const createTeamStartedAction = () => ({ type: CREATE_TEAM_STARTED });

export const createTeamFailureAction = () => ({ type: CREATE_TEAM_FAILURE });

export const createTeamSuccessAction = team => ({
    type: CREATE_TEAM_SUCCESS,
    payload: {
        team,
    },
});

export const createTeam = (name, isPublic) => (dispatch) => {
    dispatch(createTeamStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'teams';
    APIFetch.fetchPrelloAPI(resource, { name, isVisible: isPublic }, APIFetch.POST)
        .then((res) => {
            dispatch(createTeamSuccessAction(res.data.team));
        })
        .catch((error) => {
            dispatch(createTeamFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
// ===== Change team visibility ===== //
export const CHANGE_VISIBILITY_TEAM_STARTED = 'teams/CHANGE_VISIBILITY_TEAM_STARTED';
export const CHANGE_VISIBILITY_TEAM_FAILURE = 'teams/CHANGE_VISIBILITY_TEAM_FAILURE';
export const CHANGE_VISIBILITY_TEAM_SUCCESS = 'teams/CHANGE_VISIBILITY_TEAM_SUCCESS';

export const changeVisibilityTeamStartedAction = () => ({ type: CHANGE_VISIBILITY_TEAM_STARTED });

export const changeVisibilityTeamFailureAction = () => ({ type: CHANGE_VISIBILITY_TEAM_FAILURE });

export const changeVisibilityTeamSuccessAction = isVisible => ({
    type: CHANGE_VISIBILITY_TEAM_SUCCESS,
    payload: {
        isVisible,
    },
});

export const changeVisibility = (teamId, visibility) => (dispatch) => {
    dispatch(changeVisibilityTeamStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'teams'.concat(`/${teamId}/visibility`);
    APIFetch.fetchPrelloAPI(resource, { isVisible: !visibility }, APIFetch.PUT)
        .then(() => {
            dispatch(changeVisibilityTeamSuccessAction(!visibility));
        })
        .catch((error) => {
            dispatch(changeVisibilityTeamFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
