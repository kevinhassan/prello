import * as actions from '../actions/cards'

export const initialState = {
    cards: [
        {
            id: 1,
            description: "Description of the card with id equals to 1. Awesome!",
            isArchived: true
        },
        {
            id: 2,
            description: "This is a very useful description for card with id 2.",
            isArchived: false
        }
    ],
    isLoading: false,
    error: ""
}

export default function cardsReducer(state = initialState, action) {
    let error = "";
    switch (action.type) {
        case actions.DELETE_CARD:
            if (!state.cards.some((card) => { return card.id === action.payload.id })) {
                error = "Card with the id " + action.payload.id + "not found, nothing happened."
            }
            return {
                ...state,
                cards: state.cards.filter(c => c.id !== action.payload.id),
                isLoading: false,
                error: error
            }

        case actions.DELETE_CARD_WITH_DELAY_STARTED:
            return {
                ...state,
                isLoading: true
            }

        case actions.DELETE_CARD_WITH_DELAY_SUCCESS:
            if (!state.cards.some((card) => { return card.id === action.payload.id })) {
                error = "Card with the id " + action.payload.id + "not found, nothing happened."
            }
            return {
                ...state,
                cards: state.cards.filter(c => c.id !== action.payload.id),
                isLoading: false,
                error: error
            }

        default:
            return state
    }
}
