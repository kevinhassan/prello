import { TodoModel, CardModel } from "app/models";
import { RouterState } from "react-router-redux";

export interface RootState {
    router: RouterState;
    todos: RootState.TodoState;
    cards: RootState.CardState;
}

export namespace RootState {
    export type TodoState = TodoModel[];
    export type CardState = CardModel[];
}
