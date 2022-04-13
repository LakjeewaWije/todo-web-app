import { SubTask, Todo } from "todo-commons";
import { SubTaskModel, TodoModel } from "../models/todo-model";
import { SubTaskService } from "../services/subtask.service";
import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import OperationResult from "../helpers/result";

export async function createSubTask(req: Request, res: Response) {
    try {
        const data: SubTask = req.body;
        const subtask: SubTask = await SubTaskService.createSubTask(data);
        // set status of todo to pending when a new subtask is added
        await TodoService.updateTodo(data.todo_id, { status: "PENDING" } as any);

        const result: Todo = await TodoService.getSingleTodo(data.todo_id);

        if (!subtask) return res
            .status(500)
            .send(OperationResult.failed(`subtask creation failed for data `, data));

            return res
            .status(200)
            .send(OperationResult.success(result));
    } catch (error) {
        return res
            .status(500)
            .send(OperationResult.failed(error.message));
    }
}

export async function updateSubTask(req: Request, res: Response) {
    try {
        const data: SubTask = req.body;
        const id = req.params.id;

        const subtask: SubTask = await SubTaskService.updateSubTask(id, data);

        const checkIfAllCompleted = await SubTaskService.checkAllCompletedSubTasks(subtask.todo_id);

        // if all the subtasks are completed change status of todo to complete or if single subtask is pending ,set the status to complete
        if (!checkIfAllCompleted || data.status === "PENDING") {
            await TodoService.updateTodo(subtask.todo_id, data as any);
        }

        const result: Todo = await TodoService.getSingleTodo(subtask.todo_id);

        if (!subtask) return res
            .status(500)
            .send(OperationResult.failed(`subtask update failed for data `, data));

            return res
            .status(200)
            .send(OperationResult.success(result));
    } catch (error) {
        return res
            .status(500)
            .send(OperationResult.failed(error.message));
    }
}

