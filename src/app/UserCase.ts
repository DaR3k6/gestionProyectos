import { UserRepository } from "../domain/repository/UserRepository";
import { UserValue } from "../domain/value/UserValue";

export class UserCase {
  constructor(private readonly userRepository: UserRepository) {}

  public registerUser = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserValue | null> => {
    const userValue = new UserValue({ name, email, password });
    const userCreated = await this.userRepository.registerUser(userValue);
    return userCreated;
  };

  public findUserById = async (_id?: string): Promise<UserValue | null> => {
    if (!_id) {
      return null;
    }
    const user = await this.userRepository.findUserById(_id);
    return user;
  };

  public findUserLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserValue | null> => {
    const userValue = new UserValue({ name: "", email, password: "" });
    const user = await this.userRepository.findUserLogin(userValue.email);
    if (user && user.password == password) {
      return new UserValue(user);
    }
    return null;
  };

  public listUsers = async (): Promise<UserValue[] | null> => {
    const users = await this.userRepository.listUsers();
    return users;
  };

  public updateUser = async ({
    _id,
    name,
    email,
    password,
    role,
    projects,
    tasks,
  }: {
    _id: string;
    name?: string;
    email?: string;
    password?: string;
    role?: "Administrador" | "Miembro" | "Invitado";
    projects?: string[];
    tasks?: string[];
  }): Promise<UserValue | null> => {
    const userUpdate = await this.userRepository.updateUser(_id, {
      name,
      email,
      password,
      role,
      projects,
      tasks,
    });
    return userUpdate ? new UserValue(userUpdate) : null;
  };

  public deleteUser = async (_id: string): Promise<boolean> => {
    return await this.userRepository.deleteUser(_id);
  };
}
