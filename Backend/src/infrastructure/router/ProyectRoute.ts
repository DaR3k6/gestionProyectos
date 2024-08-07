import { Router } from "express";
import { MongoseRepository } from "../repository/MongoseRepository";
import { ProyectsCase } from "../../app/ProyectsCase";
import { ProjectController } from "../controller/ProyectController";

import auth from "../jwt/auth";

const route = Router();

const mongoseRepository = new MongoseRepository();
const proyectCase = new ProyectsCase(mongoseRepository);
const proyectController = new ProjectController(proyectCase);

route.post("/project", auth, proyectController.insertController);
route.get("/project/:_id", auth, proyectController.getIdController);
route.get("/project", auth, proyectController.getController);
route.put("/project/:_id", auth, proyectController.updateController);
route.delete("/project/:_id", auth, proyectController.deleteController);

export default route;
