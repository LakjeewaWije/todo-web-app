import { Todo } from "todo-commons";
import { SubTaskModel, TodoModel } from "../models/todo-model";

export async function createTodo(data: Todo) {
    return TodoModel.query().insert(data).returning("*");
}

export async function updateTodo(id: string, data: Todo) {
    return TodoModel.query().patchAndFetchById(id, data);
}

export async function getAllTodos() {
    return TodoModel.query().withGraphFetched("subtasks");
}

export async function getSingleTodo(id: string) {
    return TodoModel.query().withGraphFetched("subtasks").where("id", id).first();
}