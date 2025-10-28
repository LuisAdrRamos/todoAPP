import { SQLiteTodoDataSource } from '@/src/data/datasources/SQLiteTodoDataSource';
import { TodoRepositoryImpl } from '@/src/data/repositories/TodoRepositoryImpl';
import { GetAllTodos } from '../domain/usecases/GetTodo';
import { CreateTodo } from '../domain/usecases/CreateTodo';
import { ToggleTodo } from '../domain/usecases/ToogleTodo';
import { DeleteTodo } from '../domain/usecases/DeleteTodo';

class DIContainer {
  private static instance: DIContainer;
  private _dataSource: SQLiteTodoDataSource | null = null;
  private _repository: TodoRepositoryImpl | null = null;
 
  private constructor() {}
 
  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }
 
  async initialize(): Promise<void> {
    this._dataSource = new SQLiteTodoDataSource();
    await this._dataSource.initialize();
    this._repository = new TodoRepositoryImpl(this._dataSource);
  }
 
  get getAllTodos(): GetAllTodos {
    if (!this._repository) throw new Error('Container not initialized');
    return new GetAllTodos(this._repository);
  }
 
  get createTodo(): CreateTodo {
    if (!this._repository) throw new Error('Container not initialized');
    return new CreateTodo(this._repository);
  }
 
  get toggleTodo(): ToggleTodo {
    if (!this._repository) throw new Error('Container not initialized');
    return new ToggleTodo(this._repository);
  }
 
  get deleteTodo(): DeleteTodo {
    if (!this._repository) throw new Error('Container not initialized');
    return new DeleteTodo(this._repository);
  }
}
 
export const container = DIContainer.getInstance();