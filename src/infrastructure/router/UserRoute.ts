import { Router } from "express";
import { MongoseRepository } from "../repository/MongoseRepository";
import { UserCase } from "../../app/UserCase";
import { UserController } from "../controller/UserController";

const route = Router();

const mongoseRepository = new MongoseRepository();
const userCase = new UserCase(mongoseRepository);
const userController = new UserController(userCase);

route.post("/user", userController.insertController);
route.get("/user/:_id", userController.getIdController);
route.get("/user", userController.getController);

export default route;
