import { displayLoadingModal, hideLoadingModal } from './modal';
import { fetchPrelloAPI, DELETE } from '../helpers/fetchPrelloAPI'

// ========================

export const DELETE_CARD = 'cards/DELETE_CARD'
export const DELETE_CARD_WITH_DELAY_STARTED = 'cards/DELETE_CARD_WITH_DELAY_STARTED'
export const DELETE_CARD_WITH_DELAY_FAILURE = 'cards/DELETE_CARD_WITH_DELAY_FAILURE'
export const CREATE_CARD = 'cards/CREATE_CARD'
export const DELETE_CARD_WITH_DELAY_SUCCESS = 'cards/DELETE_CARD_WITH_DELAY_SUCCESS'
export const DELETE_CARD_WITH_DELAY_FAILURE = 'cards/DELETE_CARD_WITH_DELAY_FAILURE'
export const CREATE_CARD = 'cards/CREATE_CARD'

export const deleteCard = cardId => (dispatch) => { dispatch(deleteCardAction(cardId)); };
export const deleteCardAction = cardId => ({
  type: DELETE_CARD,
  payload: {
    id: cardId,
  },
});

export const deleteCardWithDelay = (cardId) => {
    return dispatch => {
        dispatch(displayLoadingModal())
        dispatch(deleteCardWithDelayStartedAction())
        setTimeout(() => {
            fetchPrelloAPI('/cards', {id: cardId}, DELETE)
            .then(function(res) {
                dispatch(deleteCardWithDelaySuccessAction(cardId))
                dispatch(hideLoadingModal())
            })
            .catch(function(error) {
                dispatch(deleteCardWithDelayFailureAction(cardId, error))
            })
        }, 2000)
    }
}
export const deleteCardWithDelayStartedAction = () => {
    return { type: DELETE_CARD_WITH_DELAY_STARTED }
}
export const deleteCardWithDelaySuccessAction = (cardId, res) => {
    return {
        type: DELETE_CARD_WITH_DELAY_SUCCESS,
        payload: {
            id: cardId,
            res: res
        }
    }
}
export const deleteCardWithDelayFailureAction = (cardId, error) => {
    return {
        type: DELETE_CARD_WITH_DELAY_SUCCESS,
        payload: {
            id: cardId,
            error: error
        }
    }
}


export const createCard = () => { return dispatch => dispatch(createCardAction()) }
export const createCardAction = () => {
    return {
        type: CREATE_CARD
    }
}
