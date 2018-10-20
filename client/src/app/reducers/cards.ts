import { CardActions } from "app/actions/cards";
import { CardModel } from "app/models";
import { handleActions } from "redux-actions";
import { RootState } from "./state";

const initialState: RootState.CardState = [
    {
        id: 1,
        description: "Use Prello",
        isArchived: false,
        dueDate: new Date()
    },
    {
        id: 2,
        description: "Do AWI Project",
        isArchived: false,
        dueDate: new Date()
    }
];

export const cardReducer = handleActions<RootState.CardState, CardModel>(
    {
        [CardActions.Type.DELETE_CARD]: (state, action) => {
            return state.filter((card) => card.id !== (action.payload as any));
        }
    },
    initialState,
);
