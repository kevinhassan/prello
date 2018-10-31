import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boardsReducer from './boardsReducer';
import modalReducer from './modalReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    authReducer,
    boardsReducer,
    modalReducer,
    usersReducer,
});
