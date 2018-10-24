import * as actions from '../actions/cards';

export default function cardsReducer(state = undefined, action) {
    switch (action.type) {
    case actions.DELETE_CARD:
        return state;

    default:
        return state;
    }
}
