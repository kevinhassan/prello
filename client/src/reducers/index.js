import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    cardsReducer,
    modalReducer,
});
