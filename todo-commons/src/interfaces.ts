
export interface Todo {
    id?: string;
    created_at?: Date;
    title: string;
    status: string;
    subtasks: SubTask[];
}

export interface SubTask {
    id?: string;
    todo_id: string;
    created_at?: Date;
    title: string;
    status: string;
}
