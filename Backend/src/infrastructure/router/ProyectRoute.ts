import { Router } from "express";
import { ProjectRepository } from "../repository/ProjectRepository";
import { ProyectsCase } from "../../app/ProyectsCase";
import { ProjectController } from "../controller/ProyectController";

import auth from "../jwt/auth";

const route = Router();

const projectRepository = new ProjectRepository();
const proyectCase = new ProyectsCase(projectRepository);
const proyectController = new ProjectController(proyectCase);

route.post("/project", auth, proyectController.insertController);
route.get("/project/:_id", auth, proyectController.getIdController);
route.get("/project", auth, proyectController.getController);
route.put("/project/:_id", auth, proyectController.updateController);
route.delete("/project/:_id", auth, proyectController.deleteController);

export default route;
