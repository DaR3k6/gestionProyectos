import { Request, Response } from "express";
import { UserCase } from "../../app/UserCase";

export class UserController {
  constructor(private readonly userUseCase: UserCase) {}

  public getController = async ({ query }: Request, res: Response) => {};

  public insertController = async ({ body }: Request, res: Response) => {
    const user = await this.userUseCase.registerUser(body);
    res.send({ user });
  };
}
