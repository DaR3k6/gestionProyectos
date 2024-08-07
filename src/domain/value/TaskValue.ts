import { TaskEntity } from "../entity/TaskEnity";

export class TaskValue implements TaskEntity {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status?: "Pendiente" | "En progreso" | "Completa";
  assignedTo?: string;
  project?: string;

  constructor({
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
  }) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.assignedTo = assignedTo;
    this.project = project;
  }
}
