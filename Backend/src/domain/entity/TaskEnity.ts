export interface TaskEntity {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status?: "Pendiente" | "En progreso" | "Completa";
  assignedTo?: string;
  project?: string;
}
