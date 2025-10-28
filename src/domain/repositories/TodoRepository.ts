import { CreeateTodoDTO, Todo, UpdateTodoDTO } from "../entities/Todo";

export interface TodoRepository {
    getAll(): Promise<Todo[]>;
    getById(id: string): Promise<Todo | null>;
    create(todo: CreeateTodoDTO): Promise<Todo>;
    update(todo: UpdateTodoDTO): Promise<Todo>;
    delete(id: string): Promise<void>;
}