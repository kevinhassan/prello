import { replace } from 'connected-react-router';
import * as APIFetch from '../helpers/APIFetch';
import {
    displayLoadingModal, hideLoadingModal, displayErrorMessage, displaySuccessMessage,
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
            dispatch(displaySuccessMessage(`${username} added to the team.`));
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
            dispatch(displaySuccessMessage(`${name} team created.`));
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
export const CHANGE_TEAM_VISIBILITY_STARTED = 'teams/CHANGE_TEAM_VISIBILITY_STARTED';
export const CHANGE_TEAM_VISIBILITY_FAILURE = 'teams/CHANGE_TEAM_VISIBILITY_FAILURE';
export const CHANGE_TEAM_VISIBILITY_SUCCESS = 'teams/CHANGE_TEAM_VISIBILITY_SUCCESS';

export const changeTeamVisibilityStartedAction = () => ({ type: CHANGE_TEAM_VISIBILITY_STARTED });
export const changeTeamVisibilityFailureAction = () => ({ type: CHANGE_TEAM_VISIBILITY_FAILURE });
export const changeTeamVisibilitySuccessAction = isVisible => ({
    type: CHANGE_TEAM_VISIBILITY_SUCCESS,
    payload: {
        isVisible,
    },
});

export const changeVisibility = (teamId, visibility) => (dispatch) => {
    dispatch(changeTeamVisibilityStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'teams'.concat(`/${teamId}/visibility`);
    APIFetch.fetchPrelloAPI(resource, { isVisible: visibility }, APIFetch.PUT)
        .then(() => {
            dispatch(changeTeamVisibilitySuccessAction(visibility));
            dispatch(displaySuccessMessage('Team visibility updated'));
        })
        .catch((error) => {
            dispatch(changeTeamVisibilityFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Change team name ===== //
export const CHANGE_TEAM_NAME_STARTED = 'teams/CHANGE_TEAM_NAME_STARTED';
export const CHANGE_TEAM_NAME_FAILURE = 'teams/CHANGE_TEAM_NAME_FAILURE';
export const CHANGE_TEAM_NAME_SUCCESS = 'teams/CHANGE_TEAM_NAME_SUCCESS';

export const changeTeamNameStartedAction = () => ({ type: CHANGE_TEAM_NAME_STARTED });
export const changeTeamNameFailureAction = () => ({ type: CHANGE_TEAM_NAME_FAILURE });
export const changeTeamNameSuccessAction = name => ({
    type: CHANGE_TEAM_NAME_SUCCESS,
    payload: {
        name,
    },
});

export const changeName = (teamId, name) => (dispatch) => {
    dispatch(changeTeamNameStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'teams'.concat(`/${teamId}/name`);
    APIFetch.fetchPrelloAPI(resource, { name }, APIFetch.PUT)
        .then(() => {
            dispatch(changeTeamNameSuccessAction(name));
            dispatch(displaySuccessMessage('Team renamed.'));
        })
        .catch((error) => {
            dispatch(changeTeamNameFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Change team description ===== //
export const CHANGE_TEAM_DESCRIPTION_STARTED = 'teams/CHANGE_TEAM_DESCRIPTION_STARTED';
export const CHANGE_TEAM_DESCRIPTION_FAILURE = 'teams/CHANGE_TEAM_DESCRIPTION_FAILURE';
export const CHANGE_TEAM_DESCRIPTION_SUCCESS = 'teams/CHANGE_TEAM_DESCRIPTION_SUCCESS';

export const changeTeamDescriptionStartedAction = () => ({ type: CHANGE_TEAM_DESCRIPTION_STARTED });
export const changeTeamDescriptionFailureAction = () => ({ type: CHANGE_TEAM_DESCRIPTION_FAILURE });
export const changeTeamDescriptionSuccessAction = description => ({
    type: CHANGE_TEAM_DESCRIPTION_SUCCESS,
    payload: {
        description,
    },
});

export const changeDescription = (teamId, description) => (dispatch) => {
    dispatch(changeTeamDescriptionStartedAction());
    dispatch(displayLoadingModal());
    const resource = 'teams'.concat(`/${teamId}/description`);
    APIFetch.fetchPrelloAPI(resource, { description }, APIFetch.PUT)
        .then(() => {
            dispatch(changeTeamDescriptionSuccessAction(description));
            dispatch(displaySuccessMessage('Description updated.'));
        })
        .catch((error) => {
            dispatch(changeTeamDescriptionFailureAction());
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
            dispatch(displaySuccessMessage(`${team.name} deleted.`));
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
            dispatch(displaySuccessMessage(`${member.fullName} removed from the team.`));
        })
        .catch((error) => {
            dispatch(deleteMemberFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};

// ===== Edit member right ===== //
export const EDIT_MEMBER_RIGHT_STARTED = 'teams/EDIT_MEMBER_RIGHT_STARTED';
export const EDIT_MEMBER_RIGHT_FAILURE = 'teams/EDIT_MEMBER_RIGHT_FAILURE';
export const EDIT_MEMBER_RIGHT_SUCCESS = 'teams/EDIT_MEMBER_RIGHT_SUCCESS';

export const editMemberRightStartedAction = () => ({ type: EDIT_MEMBER_RIGHT_STARTED });
export const editMemberRightFailureAction = () => ({ type: EDIT_MEMBER_RIGHT_FAILURE });
export const editMemberRightSuccessAction = member => ({
    type: EDIT_MEMBER_RIGHT_SUCCESS,
    payload: {
        member,
    },
});

export const editMemberRight = (team, member) => (dispatch) => {
    dispatch(editMemberRightStartedAction());
    dispatch(displayLoadingModal());
    const resource = `teams/${team._id}/members/${member._id}`;
    const editedMember = member;
    editedMember.isAdmin = !member.isAdmin;
    APIFetch.fetchPrelloAPI(resource, { isAdmin: editedMember.isAdmin }, APIFetch.PUT)
        .then(() => {
            dispatch(editMemberRightSuccessAction(editedMember));
            dispatch(displaySuccessMessage(`${member.fullName} right updated.`));
        })
        .catch((error) => {
            dispatch(editMemberRightFailureAction());
            dispatch(displayErrorMessage(error.response.data.error));
        })
        .finally(() => {
            dispatch(hideLoadingModal());
        });
};
