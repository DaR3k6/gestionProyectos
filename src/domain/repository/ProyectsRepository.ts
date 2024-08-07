import { ProjectEntity } from "../entity/ProyectsEntity";

export interface ProyectsRepository {
  findProjectById(_id: string): Promise<null>;
  createProject(project: ProjectEntity): Promise<ProjectEntity | null>;
  listProjects(): Promise<ProjectEntity[] | null>;
  updateProject(
    _id: string,
    project: Partial<ProjectEntity>
  ): Promise<ProjectEntity | null>;
  deleteProject(_id: string): Promise<boolean>;
}
