export interface ProjectEntity {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status?: "No iniciado" | "En progreso" | "Completo";
  team?: string[];
  tasks?: string[];
}
