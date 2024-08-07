import { Router } from "express";
import { TasksRepository } from "../repository/TaskRepository";
import { TaskCase } from "../../app/TaskCase";
import { TaskController } from "../controller/TaskController";

import auth from "../jwt/auth";
const route = Router();

const taskRepository = new TasksRepository();
const taskCase = new TaskCase(taskRepository);
const taskController = new TaskController(taskCase);

route.post("/task", auth, taskController.createTaskController);
route.get("/task", auth, taskController.listTasksController);
route.get("/task/:_id", auth, taskController.getTaskByIdController);
route.put("/task/:_id", auth, taskController.updateTaskController);
route.delete("/task/:_id", auth, taskController.deleteTaskController);

export default route;
