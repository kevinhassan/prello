import { CardModel } from "app/models";
import { createAction } from "redux-actions";

export namespace CardActions {
    export enum Type {
        DELETE_CARD = "DELETE_CARD"
    }

    export const deleteCard = createAction<CardModel["id"]>(Type.DELETE_CARD);
}

export type CardActions = Omit<typeof CardActions, "Type">;
