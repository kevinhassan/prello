import cardsReducer from './cardsReducer';
import * as actions from '../actions/card';

describe('cards reducer', () => {
    it('should return the initial state', () => {
        // Specify empty state
        expect(cardsReducer({}, {})).toEqual({});
        // Initial state
    });
});
