import * as actions from '../actions/user';
import User from '../models/User';

export const initialState = {
    user: undefined,
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
    case actions.USER_INFORMATIONS_SUCCESS:
        const userObject = new User(action.payload.profile);
        return {
            ...state,
            user: userObject,
        };

    case actions.USER_INFORMATIONS_FAILURE:
        return {
            ...state,
            errorMessage: action.payload.error,
        };

    default:
        return state;
    }
}
