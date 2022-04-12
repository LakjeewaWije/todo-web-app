-- DROP TYPE IF EXISTS public.enum_task_status_type;
CREATE TYPE public.enum_task_status_type AS ENUM ('PENDING', 'COMPLETED');

-- DROP TABLE IF EXISTS public.todo;
CREATE TABLE public.todo (
    "id" SERIAL PRIMARY KEY,
    "title" varchar(255),
    "status" public.enum_task_status_type not null default 'ENABLED',
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- DROP TABLE IF EXISTS public.todo;
CREATE TABLE public.subtask (
    "id" SERIAL PRIMARY KEY,
    "todo_id" int NOT NULL,
    "title" varchar(255),
    "status" public.enum_task_status_type not null default 'ENABLED',
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("todo_id") REFERENCES public.todo ("id")
);