import * as actions from '../actions/card';

export default function cardsReducer(state = undefined, action) {
    switch (action.type) {
    case actions.DELETE_CARD:
        return state;

    default:
        return state;
    }
}
