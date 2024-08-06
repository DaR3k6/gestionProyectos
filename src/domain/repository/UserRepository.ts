import { UserEntity } from "../entity/UserEntity";

export interface UserRepository {
  findUserById(_id?: string): Promise<UserEntity | null>;
  registerUser(user: UserEntity): Promise<UserEntity | null>;
  listUsers(): Promise<UserEntity[] | null>;
}
