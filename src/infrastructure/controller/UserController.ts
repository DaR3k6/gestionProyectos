import { Request, Response } from "express";
import { UserCase } from "../../app/UserCase";
import { Expression } from "mongoose";

export class UserController {
  constructor(private readonly userUseCase: UserCase) {}

  public getIdController = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const user = await this.userUseCase.findUserById(_id);

      if (user) {
        res
          .status(200)
          .send({ mensaje: "Usuario Encontrado", user, status: true });
      } else {
        res
          .status(400)
          .send({ mensaje: "Usuario no encontrado", status: false });
      }
    } catch (error: any) {
      res.status(500).send({
        error: `Error en la base de datos: ${error.message}`,
        status: false,
      });
    }
  };

  public insertController = async ({ body }: Request, res: Response) => {
    try {
      if (!body) {
        res
          .status(404)
          .send({ mensaje: "Los campos estan vacios", status: false });
      }

      const user = await this.userUseCase.registerUser(body);
      res
        .status(200)
        .send({ mensaje: "Registro de un usuario", user, status: true });
    } catch (error: any) {
      res.status(500).send({
        error: `Error en la base de datos: ${error.message}`,
        status: false,
      });
    }
  };

  public getController = async (req: Request, res: Response) => {
    try {
      const user = await this.userUseCase.listUsers();
      res
        .status(200)
        .send({ mensaje: "Traer todos los usuarios", user, status: true });
    } catch (error: any) {
      res.status(500).send({
        error: `Error en la base de datos: ${error.message}`,
        status: false,
      });
    }
  };
}
