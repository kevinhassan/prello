import * as actions from '../actions/boards';

export const initialState = {
    list: undefined,
};

export default function listsReducer(state = initialState, action) {
    switch (action.type) {
    case actions.CREATE_LIST_SUCCESs:
        return {
            ...state,
        };

    default:
        return state;
    }
}
