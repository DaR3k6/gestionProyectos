import { TaskCase } from "../../app/TaskCase";
import { ProjectEntity } from "../../domain/entity/ProyectsEntity";
import { TaskEntity } from "../../domain/entity/TaskEnity";
import { UserEntity } from "../../domain/entity/UserEntity";
import { ProyectsRepository } from "../../domain/repository/ProyectsRepository";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { UserRepository } from "../../domain/repository/UserRepository";
import ProjectModel from "../model/ProyectSchema";
import TaskModel from "../model/TareasSchema";
import UserModels from "../model/UserSchema";

export class MongoseRepository
  implements UserRepository, ProyectsRepository, TaskRepository
{
  //#region  User methods
  async findUserById(_id?: string): Promise<any> {
    const user = await UserModels.findOne({ _id });
    return user;
  }
  async findUserLogin(email: string): Promise<any> {
    const user = await UserModels.findOne({
      email,
    });
    return user;
  }
  async registerUser(userIn: UserEntity): Promise<any> {
    const user = await UserModels.create(userIn);
    return user;
  }
  async listUsers(): Promise<any> {
    const user = await UserModels.find();
    return user;
  }
  async updateUser(_id: string, user: Partial<UserEntity>): Promise<any> {
    const updatedUser = await UserModels.findByIdAndUpdate(_id, user, {
      new: true,
    }).exec();
    return updatedUser;
  }
  async deleteUser(_id: string): Promise<boolean> {
    const result = await UserModels.deleteOne({ _id }).exec();
    return result.deletedCount === 1;
  }
  //#endregion

  //#region Project methods
  async createProject(projectIn: ProjectEntity): Promise<any> {
    const project = new ProjectModel(projectIn);
    const savedProject = await project.save();
    return savedProject ? (savedProject.toObject() as ProjectEntity) : null;
  }

  async findProjectById(_id: string): Promise<any> {
    const project = await ProjectModel.findById(_id).exec();
    return project;
  }

  async listProjects(): Promise<any> {
    const projects = await ProjectModel.find().exec();
    return projects;
  }

  async updateProject(
    _id: string,
    project: Partial<ProjectEntity>
  ): Promise<any> {
    const updatedProject = await ProjectModel.findByIdAndUpdate(_id, project, {
      new: true,
    }).exec();
    return updatedProject;
  }

  async deleteProject(_id: string): Promise<boolean> {
    const result = await ProjectModel.deleteOne({ _id }).exec();
    return result.deletedCount === 1;
  }
  //#endregion

  //#region Task methods
  async createTask(taskIn: TaskEntity): Promise<any> {
    const task = new TaskModel(taskIn);
    const savedTask = await task.save();
    return savedTask;
  }

  async findTaskById(_id: string): Promise<any> {
    const task = await TaskModel.findById(_id).exec();
    return task;
  }

  async listTasks(): Promise<any> {
    const tasks = await TaskModel.find().exec();
    return tasks;
  }

  async updateTask(_id: string, task: Partial<TaskEntity>): Promise<any> {
    const updatedTask = await TaskModel.findByIdAndUpdate(_id, task, {
      new: true,
    }).exec();
    return updatedTask;
  }

  async deleteTask(_id: string): Promise<boolean> {
    const result = await TaskModel.deleteOne({ _id }).exec();
    return result.deletedCount === 1;
  }
  //#endregion
}
