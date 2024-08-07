import { UserEntity } from "../entity/UserEntity";

export interface UserRepository {
  findUserById(_id?: string): Promise<UserEntity | null>;
  findUserLogin(email: string): Promise<UserEntity | null>;
  registerUser(user: UserEntity): Promise<UserEntity | null>;
  listUsers(): Promise<UserEntity[] | null>;
  updateUser(
    _id: string,
    user: Partial<UserEntity>
  ): Promise<UserEntity | null>;
  deleteUser(_id: string): Promise<boolean>;
}
