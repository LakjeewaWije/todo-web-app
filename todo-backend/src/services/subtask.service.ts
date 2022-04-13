import { SubTask, Todo } from "todo-commons";
import { SubTaskModel, TodoModel } from "../models/todo-model";

export class SubTaskService {

    constructor() { };

    /**
     * createTodo
     */
    public static async createSubTask(data: SubTask) {
        return SubTaskModel.query().insert(data).returning("*");
    }

    public static async updateSubTask(id: string, data: SubTask) {
        return SubTaskModel.query().patchAndFetchById(id, data);
    }

    public static async updateAllSubTasks(id: string, data: Todo) {
        return SubTaskModel.query().patch(data).where("todo_id", id);
    }

    public static async checkAllCompletedSubTasks(id: string) {
        return SubTaskModel.query().where("todo_id", id).where("status", "PENDING").first();
    }



}