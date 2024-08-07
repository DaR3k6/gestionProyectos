import { Request, Response } from "express";
import { UserCase } from "../../app/UserCase";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UserController {
  constructor(private readonly userUseCase: UserCase) {}
  /**
   * Traer el id del usuario unico
   * @param req
   * @param res
   */
  public getIdController = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const user = await this.userUseCase.findUserById(_id);

      if (user) {
        res.status(200).send({
          titulo: "Encontrado",
          mensaje: "Usuario Encontrado",
          user,
          status: true,
        });
      } else {
        res.status(400).send({
          titulo: "Error",
          mensaje: "Usuario no encontrado",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(500).send({
        titulo: "Error",
        error: `Error en la base de datos: ${error.message}`,
        status: false,
      });
    }
  };

  /**
   * Creo el registro del usuario
   * @param req
   * @param res
   */
  public insertController = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      // Verifica si faltan campos
      if (!name || !email || !password) {
        return res.status(400).send({
          titulo: "Error",
          mensaje: "Los campos están vacíos",
          status: false,
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validar formato del correo electrónico
      if (!emailRegex.test(email)) {
        return res.status(400).send({
          titulo: "Error",
          mensaje: "El correo electrónico no tiene un formato válido",
          status: false,
        });
      }
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      //crear el nuevo objeto de usuario con la contraseña encriptada
      const userData = {
        name,
        email,
        password: hashedPassword,
      };

      const user = await this.userUseCase.registerUser(userData);
      res.status(200).send({
        titulo: "Correcto",
        mensaje: "Registro de un usuario",
        user,
        status: true,
      });
    } catch (error: any) {
      res.status(500).send({
        titulo: "Error",
        error: `Error en la base de datos: ${error.message}`,
        status: false,
      });
    }
  };

  /**
   * Traigo el usuario Completo
   * @param req
   * @param res
   */
  public getController = async (req: Request, res: Response) => {
    try {
      const user = await this.userUseCase.listUsers();
      res.status(200).send({
        titulo: "Todos",
        mensaje: "Traer todos los usuarios",
        user,
        status: true,
      });
    } catch (error: any) {
      res.status(500).send({
        titulo: "Error",
        error: `Error en la base de datos: ${error.message}`,
        status: false,
      });
    }
  };

  /**
   * Creo el login
   * @param req
   * @param res
   * @returns
   */
  public getLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        titulo: "error",
        mensaje: "Faltan datos por enviar del formulario",
        status: false,
      });
    }

    const user = await this.userUseCase.findUserLogin(req.body);
    if (!user) {
      return res.status(400).send({
        titulo: "Error",
        mensaje: "Usuario no existe en la BD",
        status: false,
      });
    } else {
      const passCoincide = await bcrypt.compareSync(password, user.password);

      if (!passCoincide) {
        return res.status(400).send({
          titulo: "Error",
          mensaje: "Contraseña incorrecta",
          status: false,
        });
      }

      const token = jwt.sign(
        { id: user.email },
        process.env.SECRETO as string,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).send({
        titulo: "Exitoso",
        mensaje: "Inicio de sesión exitoso",
        status: true,
        user,
        token,
      });
    }
  };

  /**
   * Actualiza un usuario
   * @param req - Solicitud HTTP
   * @param res - Respuesta HTTP
   */
  public updateController = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const { name, email, password, role, projects, tasks } = req.body;

      // Verifica si el ID del usuario está presente
      if (!_id) {
        return res.status(400).send({
          titulo: "Error",
          mensaje: "ID del usuario es requerido",
          status: false,
        });
      }

      // Encriptar la nueva contraseña si se proporciona
      let hashedPassword = password;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await this.userUseCase.updateUser({
        _id,
        name,
        email,
        password: hashedPassword,
        role,
        projects,
        tasks,
      });

      if (updatedUser) {
        res.status(200).send({
          titulo: "Actualizado",
          mensaje: "Usuario actualizado correctamente",
          user: updatedUser,
          status: true,
        });
      } else {
        res.status(404).send({
          titulo: "Error",
          mensaje: "Usuario no encontrado",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(500).send({
        titulo: "Error",
        mensaje: `Error en la base de datos: ${error.message}`,
        status: false,
      });
    }
  };

  /**
   * Elimina un usuario por su ID
   * @param req - Solicitud HTTP
   * @param res - Respuesta HTTP
   */
  public deleteController = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;

      // Verifica si el ID del usuario está presente
      if (!_id) {
        return res.status(400).send({
          titulo: "Error",
          mensaje: "ID del usuario es requerido",
          status: false,
        });
      }

      const deleted = await this.userUseCase.deleteUser(_id);

      if (deleted) {
        res.status(200).send({
          titulo: "Eliminado",
          mensaje: "Usuario eliminado correctamente",
          status: true,
        });
      } else {
        res.status(404).send({
          titulo: "Error",
          mensaje: "Usuario no encontrado",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(500).send({
        titulo: "Error",
        mensaje: `Error en la base de datos: ${error.message}`,
        status: false,
      });
    }
  };
}
