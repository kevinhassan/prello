import { replace } from 'connected-react-router';
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

// ===== Change team name ===== //
export const CHANGE_NAME_TEAM_STARTED = 'teams/CHANGE_NAME_TEAM_STARTED';
export const CHANGE_NAME_TEAM_FAILURE = 'teams/CHANGE_NAME_TEAM_FAILURE';
export const CHANGE_NAME_TEAM_SUCCESS = 'teams/CHANGE_NAME_TEAM_SUCCESS';

export const changeNameTeamStartedAction = () => ({ type: CHANGE_NAME_TEAM_STARTED });

export const changeNameTeamFailureAction = () => ({ type: CHANGE_NAME_TEAM_FAILURE });

export const changeNameTeamSuccessAction = name => ({
    type: CHANGE_NAME_TEAM_SUCCESS,
    payload: {
        name,
    },
});

export const changeName = (teamId, name) => (dispatch) => {
    dispatch(changeVisibilityTeamStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'teams'.concat(`/${teamId}/name`);
    APIFetch.fetchPrelloAPI(resource, { name }, APIFetch.PUT)
        .then(() => {
            dispatch(changeNameTeamSuccessAction(name));
        })
        .catch((error) => {
            dispatch(changeNameTeamFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Change team description ===== //
export const CHANGE_DESCRIPTION_TEAM_STARTED = 'teams/CHANGE_DESCRIPTION_TEAM_STARTED';
export const CHANGE_DESCRIPTION_TEAM_FAILURE = 'teams/CHANGE_DESCRIPTION_TEAM_FAILURE';
export const CHANGE_DESCRIPTION_TEAM_SUCCESS = 'teams/CHANGE_DESCRIPTION_TEAM_SUCCESS';

export const changeDescriptionTeamStartedAction = () => ({ type: CHANGE_DESCRIPTION_TEAM_STARTED });

export const changeDescriptionTeamFailureAction = () => ({ type: CHANGE_DESCRIPTION_TEAM_FAILURE });

export const changeDescriptionTeamSuccessAction = description => ({
    type: CHANGE_DESCRIPTION_TEAM_SUCCESS,
    payload: {
        description,
    },
});

export const changeDescription = (teamId, description) => (dispatch) => {
    dispatch(changeDescriptionTeamStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'teams'.concat(`/${teamId}/description`);
    APIFetch.fetchPrelloAPI(resource, { description }, APIFetch.PUT)
        .then(() => {
            dispatch(changeDescriptionTeamSuccessAction(description));
        })
        .catch((error) => {
            dispatch(changeDescriptionTeamFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Delete team ===== //
export const DELETE_TEAM_STARTED = 'teams/DELETE_TEAM_STARTED';
export const DELETE_TEAM_FAILURE = 'teams/DELETE_TEAM_FAILURE';
export const DELETE_TEAM_SUCCESS = 'teams/DELETE_TEAM_SUCCESS';

export const deleteTeamStartedAction = () => ({ type: DELETE_TEAM_STARTED });

export const deleteTeamFailureAction = () => ({ type: DELETE_TEAM_FAILURE });

export const deleteTeamSuccessAction = team => ({
    type: DELETE_TEAM_SUCCESS,
    payload: {
        team,
    },
});

export const deleteTeam = team => (dispatch) => {
    dispatch(deleteTeamStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'teams'.concat(`/${team._id}`);
    APIFetch.fetchPrelloAPI(resource, {}, APIFetch.DELETE)
        .then(() => {
            dispatch(deleteTeamSuccessAction(team));
            dispatch(replace('/profile'));
        })
        .catch((error) => {
            dispatch(deleteTeamFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Delete member ===== //
export const DELETE_MEMBER_STARTED = 'teams/DELETE_MEMBER_STARTED';
export const DELETE_MEMBER_FAILURE = 'teams/DELETE_MEMBER_FAILURE';
export const DELETE_MEMBER_SUCCESS = 'teams/DELETE_MEMBER_SUCCESS';

export const deleteMemberStartedAction = () => ({ type: DELETE_MEMBER_STARTED });

export const deleteMemberFailureAction = () => ({ type: DELETE_MEMBER_FAILURE });

export const deleteMemberSuccessAction = member => ({
    type: DELETE_MEMBER_SUCCESS,
    payload: {
        member,
    },
});

export const deleteMember = (team, member) => (dispatch) => {
    dispatch(deleteMemberStartedAction());
    dispatch(displayLoadingModal());
    const resource = `teams/${team._id}/members/${member._id}`;
    APIFetch.fetchPrelloAPI(resource, {}, APIFetch.DELETE)
        .then(() => {
            dispatch(deleteMemberSuccessAction(member));
        })
        .catch((error) => {
            dispatch(deleteMemberFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
