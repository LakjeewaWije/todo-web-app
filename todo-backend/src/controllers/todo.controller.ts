import { Todo } from "todo-commons";
import { SubTaskModel, TodoModel } from "../models/todo-model";

export async function createTodo(data: Todo) {
    return TodoModel.query().insert(data).returning("*");
}

export async function updateTodo(id: string, data: Todo) {
    return TodoModel.query().patchAndFetchById(id, data);
}

