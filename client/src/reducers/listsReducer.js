import * as actions from '../actions/boards';

export default function listsReducer(state = {}, action) {
    switch (action.type) {
    case actions.CREATE_LIST_SUCCESS:
        return {
            ...state,
        };

    default:
        return state;
    }
}
