import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boardsReducer from './boardsReducer';
import currentBoardReducer from './currentBoardReducer';
import modalReducer from './modalReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    boards: boardsReducer,
    currentBoard: currentBoardReducer,
    modal: modalReducer,
    users: usersReducer,
});
