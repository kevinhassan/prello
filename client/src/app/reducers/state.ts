import { TodoModel } from "app/models";
import { RouterState } from "react-router-redux";

export interface RootState {
    router: RouterState;
    todos: RootState.TodoState;
}

export namespace RootState {
    export type TodoState = TodoModel[];
}
