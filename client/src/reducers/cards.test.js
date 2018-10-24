import cardsReducer from './cardsReducer';
import * as actions from '../actions/card';

describe('cards reducer', () => {
    it('should return the initial state', () => {
        // Specify empty state
        expect(cardsReducer({}, {})).toEqual({});
        // Initial state
    });
});

describe('cards/DELETE_CARD reducer', () => {
    it('should delete the card with id specified', () => {
        const deleteAction = actions.deleteCardAction(1);
        const finalState = cardsReducer(undefined, deleteAction);
        expect(finalState.cards.length).toEqual(4);
    });

    it('should set an appropriate error if id not found', () => {
        const deleteAction = actions.deleteCardAction(42);
        const finalState = cardsReducer(undefined, deleteAction);
        expect(finalState.cards.length).toEqual(5);
        expect(finalState.error.toLowerCase()).toEqual(expect.stringContaining('not found'));
    });
});

describe('cards/DELETE_CARD_WITH_DELAY_STARTED reducer', () => {
    it('should set isLoading to true', () => {
        const action = actions.deleteCardWithDelayStartedAction();
        const finalState = cardsReducer(undefined, action);
        expect(finalState.isLoading).toBe(true);
    });
});
