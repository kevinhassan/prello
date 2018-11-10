import * as actions from '../actions/user';
import User from '../models/User';

export const initialState = {
    user: undefined,
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
    case actions.GET_USER_INFORMATION_SUCCESS:
        const userObject = new User(action.payload.profile);
        return {
            ...state,
            user: userObject,
        };

    case actions.UPDATE_USER_INFORMATION_SUCCESS:
        return {
            ...state,
            user: {
                ...state.user,
                fullName: action.payload.fullname,
                biography: action.payload.biography,
                initials: action.payload.initials,
            },
        };

    default:
        return state;
    }
}
