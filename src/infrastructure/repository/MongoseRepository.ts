import { UserEntity } from "../../domain/entity/UserEntity";
import { UserRepository } from "../../domain/repository/UserRepository";
import UserModels from "../model/UserSchema";

export class MongoseRepository implements UserRepository {
  async findUserById(_id?: string): Promise<any> {
    const user = await UserModels.findOne({ _id });
    return user;
  }
  async findUserLogin(email: string): Promise<any> {
    const user = await UserModels.findOne({
      email,
    });
    console.log(user);
    return user;
  }

  async registerUser(userIn: UserEntity): Promise<any> {
    const user = await UserModels.create(userIn);
    return user;
  }
  async listUsers(): Promise<any> {
    const user = await UserModels.find();
    return user;
  }
}
