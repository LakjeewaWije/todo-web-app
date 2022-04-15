import { Todo } from "todo-commons";

const host = "http://localhost:4000";

const end_points = {
    todo: {
        prefix: "/todo"
    },
    subtask: {
        prefix: "/subtask"
    }
}

export async function getAllTodos() {
    const url = `${host}${end_points.todo.prefix}`;

    return fetch(url);
}

export async function createTodo(body: any) {
    const url = `${host}${end_points.todo.prefix}`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

export async function createSubTask(body: any) {
    const url = `${host}${end_points.subtask.prefix}`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

export async function updateTodo(body: any, id: any) {
    const url = `${host}${end_points.todo.prefix}/${id}`;

    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

export async function updateSubTask(body: any, id: any) {
    const url = `${host}${end_points.subtask.prefix}/${id}`;

    return fetch(url, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}