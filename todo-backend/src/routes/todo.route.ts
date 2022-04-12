import express, { Request, Response } from "express";
import { Todo, SubTask } from "todo-commons"
import { TodoModel } from "../models/todo-model";
var router = express.Router();


/**
 * create todo
 */
router.post("/", async function (req: Request, res: Response) {
    try {
        const data: Todo = req.body;
        const todo: Todo = await TodoModel.query().insert(data).returning("*");

        if (todo) {
            res
                .status(200)
                .send(todo);
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
 * get todo
 */
router.get("/", async function (req: Request, res: Response) {



    if (true) {
        res.status(200).send("todo");
    } else {
        res.status(500).send({ error: `fetching grid failed`, data: [] });
    }
});

module.exports = router;