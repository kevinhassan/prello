import * as actions from '../actions/user';

export const initialState = {
    user: undefined,
};

export default function usersReducer(state = initialState, action) {
    if (action) {
        switch (action.type) {
        case actions.GET_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                user: action.payload.profile,
            };

        case actions.UPDATE_USER_INFORMATION_STARTED:
        case actions.UPDATE_USER_INFORMATION_FAILURE:
            return {
                ...state,
                user: {
                    ...state.user,
                    fullName: action.payload.fullName,
                    biography: action.payload.biography,
                    initials: action.payload.initials,
                },
            };

        default:
            return state;
        }
    }
    return state;
}
