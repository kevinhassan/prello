export const DELETE_CARD = 'cards/DELETE_CARD'
export const DELETE_CARD_WITH_DELAY_STARTED = 'cards/DELETE_CARD_WITH_DELAY_STARTED'
export const DELETE_CARD_WITH_DELAY_SUCCESS = 'cards/DELETE_CARD_WITH_DELAY_SUCCESS'

export const deleteCard = (cardId) => {
    return dispatch => {
        dispatch({
            type: DELETE_CARD,
            payload: {
                id: cardId
            }
        })
    }
}

export const deleteCardWithDelay = (cardId) => {
    return dispatch => {
        dispatch({
            type: DELETE_CARD_WITH_DELAY_STARTED,
        })
        setTimeout(() => {
            dispatch({
                type: DELETE_CARD_WITH_DELAY_SUCCESS,
                payload: {
                    id: cardId
                }
            })
        }, 2000)
    }

}
