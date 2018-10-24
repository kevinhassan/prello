import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';

export default combineReducers({
    boardReducer,
    modalReducer,
    userReducer,
});
