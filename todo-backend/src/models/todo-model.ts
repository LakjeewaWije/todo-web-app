import { SubTask, Todo } from "todo-commons";
import { db } from "../database";

export interface TodoModel extends Todo { }
export interface SubTaskModel extends SubTask { }

export class TodoModel extends db.BaseModel {
    static get tableName() {
        return "public.todo";
    }
    static get relationMappings() {
        return {
            subtasks: {
                relation: db.BaseModel.HasManyRelation,
                modelClass: SubTaskModel,
                filter: (query: any) => {
                    query.orderBy("id",'ASC');
                },
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