import User from '../models/User';

const user1 = new User({
    id: '1',
    nickname: 'cypcyplebg',
    initials: 'CL',
    email: 'cyprien_legrand@hotmail.fr',
    password: 'meaux2pasce',
    biography: 'slt',
});

export const initialState = {
    user: user1,
    error: '',
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
    default:
        return state;
    }
}
