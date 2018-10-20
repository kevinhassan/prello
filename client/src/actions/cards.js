export const DELETE_CARD = 'cards/DELETE_CARD'

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
