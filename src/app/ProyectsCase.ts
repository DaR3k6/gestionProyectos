import { ProyectsRepository } from "../domain/repository/ProyectsRepository";
import { ProjectValue } from "../domain/value/ProyectsValue";

export class ProyectsCase {
  constructor(private readonly projectRepository: ProyectsRepository) {}

  public createProject = async ({
    name,
    description,
    startDate,
    endDate,
    status,
    team,
    tasks,
  }: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status?: "No iniciado" | "En progreso" | "Completo";
    team?: string[];
    tasks?: string[];
  }): Promise<ProjectValue | null> => {
    const projectValue = new ProjectValue({
      name,
      description,
      startDate,
      endDate,
      status,
      team,
      tasks,
    });
    const projectCreated = await this.projectRepository.createProject(
      projectValue
    );
    return projectCreated ? new ProjectValue(projectCreated) : null;
  };

  public findProjectById = async (
    _id: string
  ): Promise<ProjectValue | null> => {
    const project = await this.projectRepository.findProjectById(_id);
    return project ? new ProjectValue(project) : null;
  };

  public listProjects = async (): Promise<ProjectValue[] | null> => {
    const projects = await this.projectRepository.listProjects();
    return projects ? projects.map(project => new ProjectValue(project)) : null;
  };

  public updateProject = async ({
    _id,
    name,
    description,
    startDate,
    endDate,
    status,
    team,
    tasks,
  }: {
    _id: string;
    name?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    status?: "No iniciado" | "En progreso" | "Completo";
    team?: string[];
    tasks?: string[];
  }): Promise<ProjectValue | null> => {
    const projectUpdate = await this.projectRepository.updateProject(_id, {
      name,
      description,
      startDate,
      endDate,
      status,
      team,
      tasks,
    });
    return projectUpdate ? new ProjectValue(projectUpdate) : null;
  };

  public deleteProject = async (_id: string): Promise<boolean> => {
    return await this.projectRepository.deleteProject(_id);
  };
}
