import User from '../models/User';


const user1 = new User(1, 'cypcyplebg', 'CL', 'cyprien_legrand@hotmail.fr', 'meaux2pasce', 'avatar.url', 'cc');


export const initialState = {
    user: user1,
    error: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
    default:
        return state;
    }
}
