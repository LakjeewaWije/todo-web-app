import { describe, it, expect, afterAll } from '@jest/globals';
import request from 'supertest'
import app from '../src/index'
describe('Todo component tests', () => {
    var id;
    var subId;
    it('Should create a todo successfully', async () => {
        const res = await request(app)
            .post('/todo')
            .send({
                title: "test todo",
            });
        console.log("todotodo ", res.body);

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('value')
        expect(res.body.status).toEqual(true);
        expect(res.body.value.title).toEqual("test todo");

        id = res.body.value.id;
    });

    it('Should create a sub task successfully', async () => {
        const res = await request(app)
            .post(`/subtask`)
            .send({
                title: "test subtask",
                todo_id: id
            });
        console.log("subtasksubtask ", res.body);

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('value')
        expect(res.body.status).toEqual(true);
        expect(res.body.value.subtasks[0].title).toEqual("test subtask");

        subId = res.body.value.subtasks[0].id;
    });

    it('Should be able to complete a sub task successfully', async () => {
        const res = await request(app)
            .patch(`/subtask/${subId}`)
            .send({
                status: "COMPLETED",
            });
        console.log("subtasksubtask ", res.body);

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('value')
        expect(res.body.status).toEqual(true);
        expect(res.body.value.subtasks[0].status).toEqual("COMPLETED");
    });

    it('Should be able change complete sub task to incomplete state successfully', async () => {
        const res = await request(app)
            .patch(`/subtask/${subId}`)
            .send({
                status: "PENDING",
            });
        console.log("subtasksubtask ", res.body);

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('value')
        expect(res.body.status).toEqual(true);
        expect(res.body.value.subtasks[0].status).toEqual("PENDING");
    });

    it('Should be able to complete a main todo successfully', async () => {
        const res = await request(app)
            .patch(`/todo/${id}`)
            .send({
                status: "COMPLETED",
            });
        console.log("todo ", res.body);

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('value')
        expect(res.body.status).toEqual(true);
        expect(res.body.value.status).toEqual("COMPLETED");
    });

    it('get single todo successfully', async () => {
        const res = await request(app)
            .get(`/todo/${id}`);
        console.log("todo ", res.body);

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('value')
        expect(res.body.status).toEqual(true);
        expect(res.body.value.title).toEqual("test todo");
    });

    it('get all todos successfully', async () => {
        const res = await request(app)
            .get(`/todo`);
        console.log("todo ", res.body);

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('value')
        expect(res.body.status).toEqual(true);
    });

    it('Should be able to delete a todo successfully', async () => {
        const res = await request(app)
            .delete(`/todo/${id}`);
        console.log("todo ", res.body);

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('value')
        expect(res.body.status).toEqual(true);
        expect(res.body.value).toEqual(1);
    });

    afterAll(done => {
        done();
    });

});