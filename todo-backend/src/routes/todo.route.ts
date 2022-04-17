import express, { Request, Response } from "express";
import { Todo, SubTask } from "todo-commons";
import { createTodo, deleteTodos, getAllTodos, getSingleTodo, updateTodo } from "../controllers/todo.controller";
import { TodoModel } from "../models/todo-model";
import { create, update } from "../validators/todo.validator";
var router = express.Router();


/**
 * create todo
 */
router.post("/", [create], createTodo);

/**
 * update todo
 */
router.patch("/:id", [update], updateTodo);

/**
 * get todos
 */
router.get("/", getAllTodos);

/**
 * get single todo with subtasks
 */
router.get("/:id", getSingleTodo);


/**
 * delete a todo
 */
 router.delete("/:id", deleteTodos);

module.exports = router;