import { TaskEntity } from "../../domain/entity/TaskEnity";
import TaskModel from "../model/TareasSchema";

export class TasksRepository implements TasksRepository {
  //#region
  async createTask(taskIn: TaskEntity): Promise<TaskEntity> {
    try {
      const task = new TaskModel(taskIn);
      const savedTask = await task.save();
      return savedTask.toObject() as TaskEntity;
    } catch (error) {
      throw error;
    }
  }

  async findTaskById(_id: string): Promise<TaskEntity | null> {
    try {
      const task = await TaskModel.findById(_id).exec();
      return task ? (task.toObject() as TaskEntity) : null;
    } catch (error) {
      throw error;
    }
  }

  async listTasks(): Promise<TaskEntity[]> {
    try {
      const tasks = await TaskModel.find().exec();
      return tasks.map(task => task.toObject() as TaskEntity);
    } catch (error) {
      throw error;
    }
  }

  async updateTask(
    _id: string,
    task: Partial<TaskEntity>
  ): Promise<TaskEntity | null> {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(_id, task, {
        new: true,
      }).exec();
      return updatedTask ? (updatedTask.toObject() as TaskEntity) : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(_id: string): Promise<boolean> {
    try {
      const result = await TaskModel.deleteOne({ _id }).exec();
      return result.deletedCount === 1;
    } catch (error) {
      throw error;
    }
  }
  //#endregion
}
