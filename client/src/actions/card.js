
// ========================

export const DELETE_CARD = 'cards/DELETE_CARD';
export const CREATE_CARD = 'cards/CREATE_CARD';

export const deleteCardAction = cardId => ({
    type: DELETE_CARD,
    payload: {
        id: cardId,
    },
});
export const deleteCard = cardId => (dispatch) => {
    dispatch(deleteCardAction(cardId));
};

export const createCardAction = () => ({
    type: CREATE_CARD,
});
export const createCard = () => dispatch => dispatch(createCardAction());
