import { ProjectEntity } from "../entity/ProyectsEntity";

export class ProjectValue implements ProjectEntity {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status?: "No iniciado" | "En progreso" | "Completo";
  team?: string[];
  tasks?: string[];

  constructor({
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
  }) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.team = team;
    this.tasks = tasks;
  }
}
