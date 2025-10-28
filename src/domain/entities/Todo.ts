export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface CreeateTodoDTO {
  title: string;
}

export interface UpdateTodoDTO {
  id: string;
  completed?: boolean;
  title?: string;
}