import { TaskRepository } from "../domain/repository/TaskRepository";
import { TaskValue } from "../domain/value/TaskValue";

export class TaskCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  public createTask = async ({
    name,
    description,
    startDate,
    endDate,
    status,
    assignedTo,
    project,
  }: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status?: "Pendiente" | "En progreso" | "Completa";
    assignedTo?: string;
    project?: string;
  }): Promise<TaskValue | null> => {
    const taskValue = new TaskValue({
      name,
      description,
      startDate,
      endDate,
      status,
      assignedTo,
      project,
    });
    const taskCreated = await this.taskRepository.createTask(taskValue);
    return taskCreated ? new TaskValue(taskCreated) : null;
  };

  public findTaskById = async (_id: string): Promise<TaskValue | null> => {
    const task = await this.taskRepository.findTaskById(_id);
    return task ? new TaskValue(task) : null;
  };

  public listTasks = async (): Promise<TaskValue[] | null> => {
    const tasks = await this.taskRepository.listTasks();
    return tasks ? tasks.map(task => new TaskValue(task)) : null;
  };

  public updateTask = async ({
    _id,
    name,
    description,
    startDate,
    endDate,
    status,
    assignedTo,
    project,
  }: {
    _id: string;
    name?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    status?: "Pendiente" | "En progreso" | "Completa";
    assignedTo?: string;
    project?: string;
  }): Promise<TaskValue | null> => {
    const taskUpdate = await this.taskRepository.updateTask(_id, {
      name,
      description,
      startDate,
      endDate,
      status,
      assignedTo,
      project,
    });
    return taskUpdate ? new TaskValue(taskUpdate) : null;
  };

  public deleteTask = async (_id: string): Promise<boolean> => {
    return await this.taskRepository.deleteTask(_id);
  };
}
