import { SubTask, Todo } from "todo-commons";
import { SubTaskModel, TodoModel } from "../models/todo-model";

export async function createSubTask(data: SubTask) {
    return SubTaskModel.query().insert(data).returning("*");
}

export async function updateSubTask(id: string, data: SubTask) {
    return SubTaskModel.query().patchAndFetchById(id, data);
}

export async function updateAllSubTasks(id: string, data: Todo) {
    return SubTaskModel.query().patch(data).where("todo_id", id);
}

export async function checkAllCompletedSubTasks(id: string) {
    return SubTaskModel.query().where("todo_id", id).where("status", "PENDING").first();
}
