<<<<<<< Updated upstream
import * as actions from '../actions/cards';
<<<<<<< Updated upstream
=======
import Card from '../models/Card';
=======
import * as actions from '../actions/card';
>>>>>>> Stashed changes
>>>>>>> Stashed changes

export default function cardsReducer(state = undefined, action) {
    switch (action.type) {
    case actions.DELETE_CARD:
        return state;

    default:
        return state;
    }
}
