import cardsReducer from './cardsReducer';

describe('cards reducer', () => {
    it('should return the initial state', () => {
        // Specify empty state
        expect(cardsReducer({}, {})).toEqual({});
        // Initial state
    });
});
