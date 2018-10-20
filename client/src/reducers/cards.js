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
            let newCards = state.cards.filter(c => c.id !== action.payload.id)
            return {
                ...state,
                cards: newCards,
                isLoading: false
            }

        default:
            return state
    }
}
