import { displayLoadingModal, hideLoadingModal } from './modal';

export const DELETE_CARD = 'cards/DELETE_CARD'
export const DELETE_CARD_WITH_DELAY_STARTED = 'cards/DELETE_CARD_WITH_DELAY_STARTED'
export const DELETE_CARD_WITH_DELAY_SUCCESS = 'cards/DELETE_CARD_WITH_DELAY_SUCCESS'
export const CREATE_CARD = 'cards/CREATE_CARD'

export const deleteCard = cardId => { return dispatch => { dispatch(deleteCardAction(cardId)) } }
export const deleteCardAction = (cardId) => {
    return {
        type: DELETE_CARD,
        payload: {
            id: cardId
        }
    }
}

export const deleteCardWithDelay = (cardId) => {
    return dispatch => {
        dispatch(displayLoadingModal())
        dispatch(deleteCardWithDelayStartedAction())
        setTimeout(() => {
            dispatch(deleteCardWithDelaySuccessAction(cardId))
            dispatch(hideLoadingModal())
        }, 2000)
    }
}
export const deleteCardWithDelayStartedAction = () => {
    return { type: DELETE_CARD_WITH_DELAY_STARTED }
}
export const deleteCardWithDelaySuccessAction = (cardId) => {
    return {
        type: DELETE_CARD_WITH_DELAY_SUCCESS,
        payload: {
            id: cardId
        }
    }
}



export const createCard = () => { return dispatch => dispatch(dispatchCreateCard()) }

export const dispatchCreateCard = () => {
    return {
        type: CREATE_CARD
    }
}
