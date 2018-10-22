import { combineReducers } from 'redux';
import cards from './cards';
import modal from './modal';

export default combineReducers({
  cards,
  modal,
});
