import * as actions from '../actions/board';
import Board from '../models/Board';
import Card from '../models/Card';
import List from '../models/List';

export const initialState = {
    board: new Board({
        id: '942',
        isArchived: false,
        name: 'Prello dev board',
        labels: [],
        lists: [
            new List({
                id: '1000',
                isArchived: false,
                name: 'TODO',
                boardId: '942',
                cards: [
                    new Card({
                        id: '1',
                        description: 'Description of the card with id equals to 1. Awesome!',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Card#1',
                    }),
                    new Card({
                        id: '2',
                        description: 'This is a description for this card. Description of the card is here.',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Card#1',
                    }),
                    new Card({
                        id: '3',
                        description: 'This is a description for this card. Description of the card is here.',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Card#1',
                    }),
                    new Card({
                        id: '4',
                        description: 'This is a description for this card. Description of the card is here. This card is marked as archived.',
                        dueDate: new Date(),
                        isArchived: true,
                        name: 'Card#1',
                    }),
                ],
            }),
            new List({
                id: '1500',
                isArchived: false,
                name: 'To buy',
                boardId: '942',
                cards: [
                    new Card({
                        id: '5', description: '3 l', dueDate: new Date(), isArchived: false, name: 'Milk',
                    }),
                    new Card({
                        id: '6', description: 'Peugeot', dueDate: new Date(), isArchived: false, name: 'Car',
                    }),
                    new Card({
                        id: '9', description: 'A good one', dueDate: new Date(), isArchived: false, name: 'Life',
                    }),
                ],
            }),
            new List({
                id: '1432',
                isArchived: true,
                name: 'To listen',
                boardId: '942',
                cards: [
                    new Card({
                        id: '10', description: 'Descriptions. Awesome!', dueDate: new Date(), isArchived: false, name: 'Name',
                    }),
                    new Card({
                        id: '11', description: 'A car', dueDate: new Date(), isArchived: false, name: 'Name',
                    }),
                    new Card({
                        id: '12', description: 'A life.', dueDate: new Date(), isArchived: false, name: 'Name',
                    }),
                ],
            }), new List({
                id: '1563',
                isArchived: false,
                name: 'Polytech',
                boardId: '942',
                cards: [
                    new Card({
                        id: '15', description: 'Description. Awesome!', dueDate: new Date(), isArchived: false, name: 'Name',
                    }),
                ],
            }), new List({
                id: '1564',
                isArchived: false,
                name: 'Awi',
                boardId: '942',
                cards: [
                    new Card({
                        id: '16', description: 'Description of the card. Awesome!', dueDate: new Date(), isArchived: false, name: 'Name',
                    }),
                    new Card({
                        id: '17', description: 'A car', dueDate: new Date(), isArchived: false, name: 'Name',
                    }),
                ],
            }), new List({
                id: '1565',
                isArchived: true,
                name: 'Flood',
                boardId: '942',
                cards: [
                    new Card({
                        id: '18', description: 'Description of the card. Awesome!', dueDate: new Date(), isArchived: false, name: 'Name',
                    }),
                    new Card({
                        id: '19', description: 'A car', dueDate: new Date(), isArchived: false, name: 'Name',
                    }),
                ],
            }),
        ],
        privacy: 'private',
        team: Array(4),
    }),
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
