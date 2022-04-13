import express, { Request, Response } from "express";
import { Todo, SubTask } from "todo-commons"
import { createSubTask, updateSubTask } from "../controllers/subtask.controller";
import { getSingleTodo, updateTodo } from "../controllers/todo.controller";
import { SubTaskModel, TodoModel } from "../models/todo-model";
import { create, update } from "../validators/subtask.validator";
var router = express.Router();

/**
 * create subtask
 */
router.post("/",[create], createSubTask);

/**
 * update subtask
 */
router.patch("/:id",[update], updateSubTask);

module.exports = router