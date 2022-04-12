import express, { Request, Response } from "express";
import { Todo, SubTask } from "todo-commons"
import { checkAllCompletedSubTasks, createSubTask, updateSubTask } from "../controllers/subtask.controller";
import { getSingleTodo, updateTodo } from "../controllers/todo.controller";
import { SubTaskModel, TodoModel } from "../models/todo-model";
var router = express.Router();

/**
 * create subtask
 */
router.post("/", async function (req: Request, res: Response) {
    try {
        const data: SubTask = req.body;
        const subtask: SubTask = await createSubTask(data);
        // set status of todo to pending when a new subtask is added
        await updateTodo(data.todo_id, { status: "PENDING" } as any);

        const result: Todo = await getSingleTodo(data.todo_id);

        if (result) {
            res
                .status(200)
                .send(result);
        } else {
            res
                .status(500)
                .send({ error: `subtask creation failed for data `, data: data });
        }
    } catch (error) {
        res
            .status(500)
            .send({ error: error });
    }
});

/**
 * update subtask
 */
router.patch("/:id", async function (req: Request, res: Response) {
    try {
        const data: SubTask = req.body;
        const id = req.params.id;

        const subtask: SubTask = await updateSubTask(id, data);

        const checkIfAllCompleted = await checkAllCompletedSubTasks(subtask.todo_id);

        // if all the subtasks are completed change status of todo to complete or if single subtask is pending ,set the status to complete
        if (!checkIfAllCompleted || data.status === "PENDING") {
            await updateTodo(subtask.todo_id, data as any);
        }

        const result: Todo = await getSingleTodo(subtask.todo_id);

        if (result) {
            res
                .status(200)
                .send(result);
        } else {
            res
                .status(500)
                .send({ error: `subtask update failed for data `, data: data });
        }
    } catch (error) {
        res
            .status(500)
            .send({ error: error });
    }
});

module.exports = router