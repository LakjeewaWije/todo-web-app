import { Todo } from "todo-commons";
import { SubTaskModel, TodoModel } from "../models/todo-model";

export class TodoService {

    constructor() { };

    /**
     * createTodo
     */
    public static async createTodo(data: Todo) {
        return TodoModel.query().insert(data).returning("*");
    }

    public static async updateTodo(id: string, data: Todo) {
        return TodoModel.query().patchAndFetchById(id, data);
    }

    public static async getAllTodos() {
        return TodoModel.query().withGraphFetched("subtasks").orderBy("id", 'ASC');
    }

    public static async getSingleTodo(id: string) {
        return TodoModel.query().withGraphFetched("subtasks").where("id", id).first().orderBy("id", 'ASC');
    }

    public static async deleteTodo(id: string) {
        await SubTaskModel.query().delete().where("todo_id", id);
        return TodoModel.query().deleteById(id).first();
    }


}