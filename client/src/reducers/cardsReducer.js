import * as actions from '../actions/cards';
import Card from '../models/Card';

const card1 = new Card(1, 'Description of the card with id equals to 1. Awesome!', true, new Date());
const card2 = new Card(2, 'This is a very useful description for card with id 2.', true, new Date());
const card3 = new Card(3, 'This is a very useful description for card with id 3.', true, new Date());
const card4 = new Card(4, 'This is a very useful description for card with id 4.', true, new Date());
const card5 = new Card(5, 'This is a very useful description for card with id 5.', true, new Date());


export const initialState = {
    cards: [
        card1,
        card2,
        card3,
        card4,
        card5,
    ],
    isLoading: false,
    error: '',
};

export default function cardsReducer(state = initialState, action) {
    let error = '';
    switch (action.type) {
    case actions.DELETE_CARD:
        if (!state.cards.some(card => card.id === action.payload.id)) {
            error = `Card with the id ${action.payload.id} not found, nothing happened.`;
        }
        return {
            ...state,
            cards: state.cards.filter(c => c.id !== action.payload.id),
            isLoading: false,
            error,
        };

    case actions.DELETE_CARD_WITH_DELAY_STARTED:
        return {
            ...state,
            isLoading: true,
        };

    case actions.DELETE_CARD_WITH_DELAY_SUCCESS:
        if (!state.cards.some(card => card.id === action.payload.id)) {
            error = `Card with the id ${action.payload.id} not found, nothing happened.`;
        }
        return {
            ...state,
            cards: state.cards.filter(c => c.id !== action.payload.id),
            isLoading: false,
            error,
        };

    case actions.CREATE_CARD:
        const newId = state.cards.reduce((a, b) => (a.id > b.id ? a.id : b.id), 0) + 1;
        const newCard = new Card(newId, 'New card', false, new Date());
        return {
            ...state,
            cards: state.cards.concat([newCard]),
        };

    default:
        return state;
    }
}
