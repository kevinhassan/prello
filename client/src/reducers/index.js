import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import cardsReducer from './cardsReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';

export default combineReducers({
    boardReducer,
    cardsReducer,
    modalReducer,
    userReducer,
});
