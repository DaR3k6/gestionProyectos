import { TaskEntity } from "../entity/TaskEnity";

export interface TaskRepository {
  findTaskById(_id: string): Promise<TaskEntity | null>;
  createTask(task: TaskEntity): Promise<TaskEntity | null>;
  listTasks(): Promise<TaskEntity[] | null>;
  updateTask(
    _id: string,
    task: Partial<TaskEntity>
  ): Promise<TaskEntity | null>;
  deleteTask(_id: string): Promise<boolean>;
}
