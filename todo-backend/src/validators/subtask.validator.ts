import { Request, Response } from "express";
import Joi from "joi";
import OperationResult from "../helpers/result";

export function create(req: Request, res: Response, next) {
    const data = req.body;
    console.log(typeof data.todo_id);

    // define the validation schema
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        todo_id: Joi.number().integer().required()
    });

    const { error } = schema.validate(data);

    // unprocessed entity
    if (error) return res.status(422).jsonp(OperationResult.failed(error.message));

    next();
}

export function update(req: Request, res: Response, next) {
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({
        status: Joi.string().required()
    });

    const { error } = schema.validate(data);

    // unprocessed entity
    if (error) return res.status(422).jsonp(OperationResult.failed(error.message));

    next();
}