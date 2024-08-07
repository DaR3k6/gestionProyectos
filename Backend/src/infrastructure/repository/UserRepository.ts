import { UserEntity } from "../../domain/entity/UserEntity";
import { UserRepository } from "../../domain/repository/UserRepository";
import UserModels from "../model/UserSchema";

export class UsersRepository implements UserRepository {
  //#region  User methods
  async findUserById(_id?: string): Promise<UserEntity | null> {
    try {
      const user = await UserModels.findOne({ _id });
      return user ? (user.toObject() as UserEntity) : null;
    } catch (error) {
      throw error;
    }
  }

  async findUserLogin(email: string): Promise<UserEntity | null> {
    try {
      const user = await UserModels.findOne({ email }).exec();
      return user ? (user.toObject() as UserEntity) : null;
    } catch (error) {
      throw error;
    }
  }
  async registerUser(userIn: UserEntity): Promise<UserEntity> {
    try {
      const user = new UserModels(userIn);
      const savedUser = await user.save();
      return savedUser.toObject() as UserEntity;
    } catch (error) {
      throw error;
    }
  }
  async listUsers(): Promise<UserEntity[]> {
    try {
      const users = await UserModels.find().exec();
      return users.map(user => user.toObject() as UserEntity);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    _id: string,
    user: Partial<UserEntity>
  ): Promise<UserEntity | null> {
    try {
      const updatedUser = await UserModels.findByIdAndUpdate(_id, user, {
        new: true,
      }).exec();
      return updatedUser ? (updatedUser.toObject() as UserEntity) : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(_id: string): Promise<boolean> {
    try {
      const result = await UserModels.deleteOne({ _id }).exec();
      return result.deletedCount === 1;
    } catch (error) {
      throw error;
    }
  }
  //#endregion
}
