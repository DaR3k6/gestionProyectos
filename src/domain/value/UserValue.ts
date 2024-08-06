import { UserEntity } from "../entity/UserEntity";

export class UserValue implements UserEntity {
  _id?: string;
  name: string;
  email: string;
  password: string;

  constructor({
    _id,
    name,
    email,
    password,
  }: {
    _id?: string;
    name: string;
    email: string;
    password: string;
  }) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
