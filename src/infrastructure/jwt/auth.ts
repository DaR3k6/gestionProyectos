import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send({
      titulo: "Error",
      mensaje: "Acceso denegado, No tiene token válido",
      status: false,
    });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      titulo: "Error",
      mensaje: "Acceso denegado, No tiene token válido",
      status: false,
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRETO as string);
    req.body = payload;
    next();
  } catch (error: any) {
    return res.status(401).send({
      titulo: "Error",
      mensaje: "Token no válido",
      status: false,
    });
  }
};

export default auth;
