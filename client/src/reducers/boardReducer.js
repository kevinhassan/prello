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
                        list: new List({ name: 'TODO' }),
                    }),
                    new Card({
                        id: '2',
                        description: 'This is a description for this card. Description of the card is here.',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Card#1',
                        list: new List({ name: 'TODO' }),
                    }),
                    new Card({
                        id: '3',
                        description: 'This is a description for this card. Description of the card is here.',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Card#1',
                        list: new List({ name: 'TODO' }),
                    }),
                    new Card({
                        id: '4',
                        description: 'This is a description for this card. Description of the card is here. This card is marked as archived.',
                        dueDate: new Date(),
                        isArchived: true,
                        name: 'Card#1',
                        list: new List({ name: 'TODO' }),
                    }),
                    new Card({
                        id: '4d88qs',
                        description: 'This is a description for this card. Description of the card is here. This card is marked as archived.',
                        dueDate: new Date(),
                        isArchived: true,
                        name: 'Card#455',
                        list: new List({ name: 'TODO' }),
                    }),
                    new Card({
                        id: '3dsd88qs',
                        description: 'This is a description for this card. Description of the card is here. This card is marked as archived.',
                        dueDate: new Date(),
                        isArchived: true,
                        name: 'I need to test how a card is rendered when his title is long.',
                        list: new List({ name: 'TODO' }),
                    }),
                    new Card({
                        id: '4d578qs',
                        description: 'This is a description for this card. Description of the card is here. This card is marked as archived.',
                        dueDate: new Date(),
                        isArchived: true,
                        name: 'Card#21',
                        list: new List({ name: 'TODO' }),
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
                        id: '5', description: '3 l', dueDate: new Date(), isArchived: false, name: 'Milk', list: new List({ name: 'To buy' }),
                    }),
                    new Card({
                        id: '6', description: 'Peugeot', dueDate: new Date(), isArchived: false, name: 'Car', list: new List({ name: 'To buy' }),
                    }),
                    new Card({
                        id: '9', description: 'A good one', dueDate: new Date(), isArchived: false, name: 'Life', list: new List({ name: 'To buy' }),
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
                        id: '10',
                        description: 'Descriptions. Awesome!',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Name',
                        list: new List({ name: 'To listen' }),
                    }),
                    new Card({
                        id: '11',
                        description: 'A car',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Name',
                        list: new List({ name: 'To listen' }),
                    }),
                    new Card({
                        id: '12',
                        description: 'A life.',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Name',
                        list: new List({ name: 'To listen' }),
                    }),
                ],
            }), new List({
                id: '1563',
                isArchived: false,
                name: 'Polytech',
                boardId: '942',
                cards: [
                    new Card({
                        id: '15',
                        description: 'Description. Awesome!',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Name',
                        list: new List({ name: 'Polytech' }),
                    }),
                ],
            }), new List({
                id: '1564',
                isArchived: false,
                name: 'Awi',
                boardId: '942',
                cards: [
                    new Card({
                        id: '16',
                        description: 'Description of the card. Awesome!',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Name',
                        list: new List({ name: 'Awi' }),
                    }),
                    new Card({
                        id: '17',
                        description: 'A car',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Name',
                        list: new List({ name: 'Awi' }),
                    }),
                ],
            }), new List({
                id: '1565',
                isArchived: true,
                name: 'Flood',
                boardId: '942',
                cards: [
                    new Card({
                        id: '18',
                        description: 'Description of the card. Awesome!',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Name',
                        list: new List({ name: 'Flood' }),
                    }),
                    new Card({
                        id: '19',
                        description: 'A car',
                        dueDate: new Date(),
                        isArchived: false,
                        name: 'Name',
                        list: new List({ name: 'Flood' }),
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
