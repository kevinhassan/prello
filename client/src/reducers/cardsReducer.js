import * as actions from '../actions/cards';
import Card from '../models/Card';

const card1 = new Card(1, 'Description of the card with id equals to 1. Awesome!', new Date(), 1, false);
const card2 = new Card(2, 'This is a very useful description for card with id 2.', new Date(), 2, false);
const card3 = new Card(3, 'This is a very useful description for card with id 3.', new Date(), 3, false);
const card4 = new Card(4, 'This is a very useful description for card with id 4.', new Date(), 4, false);
const card5 = new Card(5, 'This is a very useful description for card with id 5.', new Date(), 5, true);


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
        const newIndex = state.cards.reduce((a, b) => (a.index > b.index ? a.index : b.index), 0) + 1;
        const newCard = new Card(newId, 'New card', new Date(), false, newIndex);
        return {
            ...state,
            cards: state.cards.concat([newCard]),
        };

    default:
        return state;
    }
}
