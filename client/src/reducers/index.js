import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boardReducer from './boardReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';

export default combineReducers({
    authReducer,
    boardReducer,
    modalReducer,
    userReducer,
});
