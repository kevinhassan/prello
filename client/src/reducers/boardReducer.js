import * as actions from '../actions/board';
import Board from '../models/Board';
import List from '../models/List';
import Card from '../models/Card';

export const initialState = {
    board: new Board(
        1, false, 'Prello dev board', [], [
            new List(1, 1, false, 'List 1 name', [
                new Card(1, 'Description of the card with id equals to 1. Awesome!', new Date(), 1, false, 'Card#1'),
                new Card(2, 'This is a very useful description for card with id 2.', new Date(), 2, false, 'Card#2'),
                new Card(3, 'This is a very useful description for card with id 3.', new Date(), 3, false, 'Card#3'),
                new Card(4, 'This is a very useful description for card with id 4.', new Date(), 4, false, 'Card#4'),
                new Card(5, 'This is a very useful description for card with id 5.', new Date(), 5, true, 'Card#5'),
            ]),
        ], Array(2), 'private', Array(4),
    ),
};

export default function boardReducer(state = initialState, action) {
    switch (action.type) {
    case actions.FETCH_BOARD_SUCCESS:
        return {
            ...state,
            board: action.payload.board,
        };

    default:
        return state;
    }
}
