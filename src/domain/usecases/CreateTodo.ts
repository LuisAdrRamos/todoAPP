import { CreateTodoDTO, Todo } from "../entities/Todo";
import { TodoRepository } from "../repositories/TodoRepository";

export class CreateTodo {
    constructor(private repository: TodoRepository) { }

    async execute(data: CreateTodoDTO): Promise<Todo> {
        if (!data.title || data.title.trim() === "") {
            throw new Error("Title is required");
        }

        if (data.title.length > 200) {
            throw new Error("Title must be less than 200 characters");
        }

        if (!data.userId) {
            throw new Error("User ID is required");
        }

        return await this.repository.create(data);
    }
}
