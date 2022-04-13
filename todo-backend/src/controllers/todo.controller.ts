import { Todo } from "todo-commons";
import { SubTaskModel, TodoModel } from "../models/todo-model";
import { TodoService } from "../services/todo.service";
import { Request, Response } from "express";
import { SubTaskService } from "../services/subtask.service";
import OperationResult from "../helpers/result";

export async function createTodo(req: Request, res: Response) {
    try {
        const data: Todo = req.body;
        const todo: Todo = await TodoService.createTodo(data);

        const result: Todo = await TodoService.getSingleTodo(todo.id);

        if (!todo) return res
            .status(500)
            .send(OperationResult.failed(`todo creation failed for data `, data));

        return res
            .status(200)
            .send(OperationResult.success(result));

    } catch (error) {
        return res
            .status(500)
            .send(OperationResult.failed(error.message));
    }
}

export async function updateTodo(req: Request, res: Response) {
    try {
        const data: Todo = req.body;
        const id = req.params.id;

        const todo: Todo = await TodoService.updateTodo(id, data);
        let subtasks: number;

        if (data.status === "COMPLETED") {
            subtasks = await SubTaskService.updateAllSubTasks(id, data);
        }

        const result: Todo = await TodoService.getSingleTodo(id);

        if (!todo) return res
            .status(500)
            .send(OperationResult.failed(`todo update failed for data `, data));

        return res
            .status(200)
            .send(OperationResult.success(result));
    } catch (error) {
        return res
            .status(500)
            .send(OperationResult.failed(error.message));
    }
}

export async function getAllTodos(req: Request, res: Response) {
    try {
        let todo: Todo[] = await TodoService.getAllTodos();
        return res
            .status(200)
            .send(OperationResult.success(todo));
    } catch (error) {
        return res
            .status(500)
            .send(OperationResult.failed(error.message));
    }
}

export async function getSingleTodo(req: Request, res: Response) {
    try {
        const id = req.params.id;
        let todo: Todo = await TodoService.getSingleTodo(id);
        return res
            .status(200)
            .send(OperationResult.success(todo));
    } catch (error) {
        return res
            .status(500)
            .send(OperationResult.failed(error.message));
    }
}