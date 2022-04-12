
export interface Todo {
    _id?: string;
    created_at?: Date;
    title: string;
    status: string;
    subtasks: SubTask[];
}

export interface SubTask {
    _id?: string;
    todo_id: string;
    created_at?: Date;
    title: string;
    status: string;
}
