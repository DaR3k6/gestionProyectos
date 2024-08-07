import { UserEntity } from "../entity/UserEntity";

export class UserValue implements UserEntity {
  name: string;
  email: string;
  password: string;
  role?: "Administrador" | "Miembro" | "Invitado";
  projects?: string[];
  tasks?: string[];
  constructor({
    name,
    email,
    password,
    role,
    projects,
    tasks,
  }: {
    name: string;
    email: string;
    password: string;
    role?: "Administrador" | "Miembro" | "Invitado";
    projects?: string[];
    tasks?: string[];
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.projects = projects;
    this.tasks = tasks;
  }
}
