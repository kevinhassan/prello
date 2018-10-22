import * as actions from '../actions/cards';

export const initialState = {
  cards: [
    {
      id: 1,
      description: 'Description of the card with id equals to 1. Awesome!',
      isArchived: true,
    },
    {
      id: 2,
      description: 'This is a very useful description for card with id 2.',
      isArchived: false,
    },
    {
      id: 3,
      description: 'This is a very useful description for card with id 3.',
      isArchived: false,
    },
    {
      id: 4,
      description: 'This is a very useful description for card with id 4.',
      isArchived: false,
    },
    {
      id: 5,
      description: 'This is a very useful description for card with id 5.',
      isArchived: false,
    },
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

        case actions.DELETE_CARD_WITH_DELAY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: error
            }

        case actions.DELETE_CARD_WITH_DELAY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: error
            }

        case actions.DELETE_CARD_WITH_DELAY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: error
            }

        case actions.CREATE_CARD:
            var newCard = {
                id: state.cards.reduce((a, b) => a.id > b.id ? a.id : b.id) + 1,
                description: "New card",
                isArchived: false
            }
            return {
                ...state,
                cards: state.cards.concat([newCard])
            }

    default:
      return state;
  }
}
