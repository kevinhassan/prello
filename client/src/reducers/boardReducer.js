import * as actions from '../actions/board';
import Board from '../models/Board';
import List from '../models/List';
import Card from '../models/Card';

export const initialState = {
    board: new Board(
        1, false, 'Prello dev board', [], [
            new List(1, 2, false, 'TODO', [
                new Card(1, 'Description of the card with id equals to 1. Awesome!', new Date(), 1, false, 'Card#1'),
                new Card(2, 'This is a very useful description for card with id 2.', new Date(), 2, false, 'Card#2'),
                new Card(3, 'This is a very useful description for card with id 3.', new Date(), 3, false, 'Card#3'),
                new Card(4, 'This is a very useful description for card with id 4.', new Date(), 4, false, 'Card#4'),
                new Card(5, 'This is a very useful description for card with id 5.', new Date(), 5, true, 'Card#5'),
                new Card(6, 'This is a very useful description for card with id 5.', new Date(), 6, true, 'Card#6'),
            ]),
            new List(2, 1, false, 'To buy', [
                new Card(7, '3L', new Date(), 1, false, 'Milk'),
                new Card(8, 'Peugeot', new Date(), 2, false, 'Car'),
                new Card(9, 'A good one', new Date(), 3, false, 'Life'),
            ]), new List(3, 1, true, 'To listen', [
                new Card(10, 'Descriptions. Awesome!', new Date(), 1, false, 'Name'),
                new Card(11, 'A car', new Date(), 2, false, 'Name'),
                new Card(12, 'A life.', new Date(), 3, false, 'Name'),
                new Card(13, 'This is a very useful description.', new Date(), 4, false, 'Name'),
                new Card(14, 'This is a very useful description.', new Date(), 5, true, 'Name'),
            ]), new List(4, 1, false, 'Polytech', [
                new Card(15, 'Description. Awesome!', new Date(), 1, false, 'Name'),
            ]), new List(5, 1, false, 'Awi', [
                new Card(16, 'Description of the card. Awesome!', new Date(), 1, false, 'Name'),
                new Card(17, 'A car', new Date(), 2, false, 'Name'),
            ]), new List(6, 1, true, 'Flood', [
                new Card(18, 'Description of the card. Awesome!', new Date(), 1, false, 'Name'),
                new Card(19, 'A car', new Date(), 2, false, 'Name'),
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
