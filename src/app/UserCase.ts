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
    const user = await this.userRepository.findUserById(_id);
    return user;
  };

  public findUserLogin = async ({
    email,
  }: {
    email: string;
    password: string;
  }): Promise<UserValue | null> => {
    const userValue = new UserValue({ name: "", email, password: "" });
    console.log(userValue);
    const user = await this.userRepository.findUserLogin(userValue.email);
    return user;
  };

  public listUsers = async (): Promise<UserValue[] | null> => {
    const users = await this.userRepository.listUsers();
    return users;
  };
}
