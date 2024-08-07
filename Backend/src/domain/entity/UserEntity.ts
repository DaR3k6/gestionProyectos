export interface UserEntity {
  name: string;
  email: string;
  password: string;
  role?: "Administrador" | "Miembro" | "Invitado";
  projects?: string[];
  tasks?: string[];
}
