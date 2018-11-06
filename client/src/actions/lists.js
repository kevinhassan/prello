import * as APIFetch from '../helpers/APIFetch';
import { displayErrorMessage, displaySuccessMessage } from './modal';

// ========================

export const CREATE_LIST_STARTED = 'list/CREATE_LIST_STARTED';
export const CREATE_LIST_FAILURE = 'list/CREATE_LIST_FAILURE';
export const CREATE_LIST_SUCCESS = 'list/CREATE_LIST_SUCCESS';

export const createListStartedAction = () => ({
    type: CREATE_LIST_STARTED,
});

export const createListFailureAction = error => ({
    type: CREATE_LIST_FAILURE,
    payload: {
        error,
    },
});

export const createListSuccessAction = list => ({
    type: CREATE_LIST_SUCCESS,
    payload: {
        list,
    },
});


export const createList = list => (dispatch) => {
    dispatch(createListStartedAction());
    const resource = 'boards/'.concat(list.boardId).concat('/lists/');
    APIFetch.fetchPrelloAPI(resource, { name: list.name }, APIFetch.POST)
        .then((res) => {
            const listCreated = res.data.list;
            dispatch(createListSuccessAction(listCreated));
            dispatch(displaySuccessMessage(res.data.message));
        })
        .catch((error) => {
            dispatch(createListFailureAction(error.response.data.error));
            dispatch(displayErrorMessage(error.response.data.error));
        });
};
