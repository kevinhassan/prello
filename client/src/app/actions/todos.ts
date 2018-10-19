import { TodoModel } from "app/models";
import { createAction } from "redux-actions";

export namespace TodoActions {
    export enum Type {
        ADD_TODO = "ADD_TODO",
        EDIT_TODO = "EDIT_TODO",
        DELETE_TODO = "DELETE_TODO",
        COMPLETE_TODO = "COMPLETE_TODO",
        COMPLETE_ALL = "COMPLETE_ALL",
        CLEAR_COMPLETED = "CLEAR_COMPLETED",
        HIGHTLIGHT_TODO = "HIGHTLIGHT_TODO",
    }

    export const addTodo = createAction<PartialPick<TodoModel, "text">>(Type.ADD_TODO);
    export const editTodo = createAction<PartialPick<TodoModel, "id">>(Type.EDIT_TODO);
    export const deleteTodo = createAction<TodoModel["id"]>(Type.DELETE_TODO);
    export const hightlightTodo = createAction<TodoModel["id"]>(Type.HIGHTLIGHT_TODO);
    export const completeTodo = createAction<TodoModel["id"]>(Type.COMPLETE_TODO);
    export const completeAll = createAction(Type.COMPLETE_ALL);
    export const clearCompleted = createAction(Type.CLEAR_COMPLETED);
}

export type TodoActions = Omit<typeof TodoActions, "Type">;