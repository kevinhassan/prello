import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';

export default combineReducers({
    cardsReducer,
    modalReducer,
    userReducer,
});
