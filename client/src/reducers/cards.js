import * as actions from '../actions/cards'

const initialState = {
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

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(c => c.id !== action.payload.id),
                isLoading: false
            }

        case actions.DELETE_CARD_WITH_DELAY_STARTED:
            return {
                ...state,
                isLoading: true
            }

        case actions.DELETE_CARD_WITH_DELAY_SUCCESS:
            return {
                ...state,
                cards: state.cards.filter(c => c.id !== action.payload.id),
                isLoading: false
            }

        default:
            return state
    }
}
