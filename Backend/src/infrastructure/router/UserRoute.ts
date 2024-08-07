import { Router } from "express";
import { MongoseRepository } from "../repository/MongoseRepository";
import { UserCase } from "../../app/UserCase";
import { UserController } from "../controller/UserController";
import auth from "../jwt/auth";

const route = Router();

const mongoseRepository = new MongoseRepository();
const userCase = new UserCase(mongoseRepository);
const userController = new UserController(userCase);

route.post("/user/register", userController.insertController);
route.post("/user/login", userController.getLogin);
route.get("/user/:_id", auth, userController.getIdController);
route.get("/user", auth, userController.getController);
route.put("/user/:_id", auth, userController.updateController);
route.delete("/user/:_id", auth, userController.deleteController);

export default route;
