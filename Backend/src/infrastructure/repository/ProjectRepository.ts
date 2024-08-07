import { ProjectEntity } from "../../domain/entity/ProyectsEntity";
import { ProyectsRepository } from "../../domain/repository/ProyectsRepository";
import ProjectModel from "../model/ProyectSchema";

export class ProjectRepository implements ProyectsRepository {

  //#region Project methods
  async createProject(projectIn: ProjectEntity): Promise<ProjectEntity | null> {
    try {
      const project = new ProjectModel(projectIn);
      const savedProject = await project.save();
      return savedProject ? (savedProject.toObject() as ProjectEntity) : null;
    } catch (error) {
      throw error;
    }
  }

  async findProjectById(_id: string): Promise<null> {
    try {
      const project = await ProjectModel.findById(_id).exec();
      return project ? null : null;
    } catch (error) {
      throw error;
    }
  }

  async listProjects(): Promise<ProjectEntity[]> {
    try {
      const projects = await ProjectModel.find().exec();
      return projects.map(project => project.toObject() as ProjectEntity);
    } catch (error) {
      throw error;
    }
  }

  async updateProject(
    _id: string,
    project: Partial<ProjectEntity>
  ): Promise<ProjectEntity | null> {
    try {
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        _id,
        project,
        {
          new: true,
        }
      ).exec();
      return updatedProject
        ? (updatedProject.toObject() as ProjectEntity)
        : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(_id: string): Promise<boolean> {
    try {
      const result = await ProjectModel.deleteOne({ _id }).exec();
      return result.deletedCount === 1;
    } catch (error) {
      throw error;
    }
  }
  //#endregion
}
