import { Todo } from "todo-commons";
import { db } from "../database";

export interface TodoModel extends Todo {}

export class TodoModel extends db.BaseModel {
    static get tableName() {
        return "public.todo";
    }
    static get relationMappings() {
        return {
            subTasks: {
                relation: db.BaseModel.HasManyRelation,
                modelClass: SubTaskModel,
                join: {
                    from: "public.todo.id",
                    to: "public.subtask.todo_id",
                },
            },
        };
    }
}
export class SubTaskModel extends db.BaseModel {
    static get tableName() {
        return "public.subtask";
    }
}