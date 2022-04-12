import express, { Request, Response } from "express";
import { Todo, SubTask } from "todo-commons"
import { updateAllSubTasks } from "../controllers/subtask.controller";
import { createTodo, getAllTodos, getSingleTodo, updateTodo } from "../controllers/todo.controller";
import { TodoModel } from "../models/todo-model";
var router = express.Router();


/**
 * create todo
 */
router.post("/", async function (req: Request, res: Response) {
    try {
        const data: Todo = req.body;
        const todo: Todo = await createTodo(data);

        const result: Todo = await getSingleTodo(todo.id);

        if (result) {
            res
                .status(200)
                .send(result);
        } else {
            res
                .status(500)
                .send({ error: `todo creation failed for data `, data: data });
        }
    } catch (error) {
        res
            .status(500)
            .send({ error: error });
    }
});

/**
 * update todo
 */
router.patch("/:id", async function (req: Request, res: Response) {
    try {
        const data: Todo = req.body;
        const id = req.params.id;

        let todo: Todo = await updateTodo(id, data);
        let subtasks: number;

        if (data.status === "COMPLETED") {
            subtasks = await updateAllSubTasks(id, data);
        }

        const result: Todo = await getSingleTodo(id);

        if (result) {
            res
                .status(200)
                .send(result);
        } else {
            res
                .status(500)
                .send({ error: `todo update failed for data `, data: data });
        }
    } catch (error) {
        res
            .status(500)
            .send({ error: error });
    }
});

/**
 * get todos
 */
router.get("/", async function (req: Request, res: Response) {
    try {
        let todo: Todo[] = await getAllTodos();
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * get single todo with subtasks
 */
router.get("/:id", async function (req: Request, res: Response) {
    try {
        const id = req.params.id;
        let todo: Todo = await getSingleTodo(id);
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;