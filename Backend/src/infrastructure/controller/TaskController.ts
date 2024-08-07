import { Request, Response } from "express";
import { TaskCase } from "../../app/TaskCase";

export class TaskController {
  constructor(private readonly taskCase: TaskCase) {}

  /**
   * Crea una nueva tarea
   * @param req - Solicitud HTTP
   * @param res - Respuesta HTTP
   */
  public createTaskController = async (req: Request, res: Response) => {
    try {
      const {
        name,
        description,
        startDate,
        endDate,
        status,
        assignedTo,
        project,
      } = req.body;

      // Verifica si faltan campos obligatorios
      if (!name || !description || !startDate || !endDate) {
        return res.status(400).send({
          titulo: "Error",
          mensaje: "Campos obligatorios están vacíos",
          status: false,
        });
      }

      const task = await this.taskCase.createTask({
        name,
        description,
        startDate,
        endDate,
        status,
        assignedTo,
        project,
      });

      if (task) {
        res.status(201).send({
          titulo: "Creado",
          mensaje: "Tarea creada exitosamente",
          task,
          status: true,
        });
      } else {
        res.status(500).send({
          titulo: "Error",
          mensaje: "No se pudo crear la tarea",
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
   * Obtiene una tarea por su ID
   * @param req - Solicitud HTTP
   * @param res - Respuesta HTTP
   */
  public getTaskByIdController = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const task = await this.taskCase.findTaskById(_id);

      if (task) {
        res.status(200).send({
          titulo: "Encontrado",
          mensaje: "Tarea encontrada",
          task,
          status: true,
        });
      } else {
        res.status(404).send({
          titulo: "Error",
          mensaje: "Tarea no encontrada",
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
   * Obtiene todas las tareas
   * @param req - Solicitud HTTP
   * @param res - Respuesta HTTP
   */
  public listTasksController = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskCase.listTasks();
      res.status(200).send({
        titulo: "Listado",
        mensaje: "Tareas obtenidas correctamente",
        tasks,
        status: true,
      });
    } catch (error: any) {
      res.status(500).send({
        titulo: "Error",
        mensaje: `Error en la base de datos: ${error.message}`,
        status: false,
      });
    }
  };

  /**
   * Actualiza una tarea
   * @param req - Solicitud HTTP
   * @param res - Respuesta HTTP
   */
  public updateTaskController = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const {
        name,
        description,
        startDate,
        endDate,
        status,
        assignedTo,
        project,
      } = req.body;

      // Verifica si el ID de la tarea está presente
      if (!_id) {
        return res.status(400).send({
          titulo: "Error",
          mensaje: "ID de la tarea es requerido",
          status: false,
        });
      }

      const updatedTask = await this.taskCase.updateTask({
        _id,
        name,
        description,
        startDate,
        endDate,
        status,
        assignedTo,
        project,
      });

      if (updatedTask) {
        res.status(200).send({
          titulo: "Actualizado",
          mensaje: "Tarea actualizada correctamente",
          task: updatedTask,
          status: true,
        });
      } else {
        res.status(404).send({
          titulo: "Error",
          mensaje: "Tarea no encontrada",
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
   * Elimina una tarea por su ID
   * @param req - Solicitud HTTP
   * @param res - Respuesta HTTP
   */
  public deleteTaskController = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;

      // Verifica si el ID de la tarea está presente
      if (!_id) {
        return res.status(400).send({
          titulo: "Error",
          mensaje: "ID de la tarea es requerido",
          status: false,
        });
      }

      const deleted = await this.taskCase.deleteTask(_id);

      if (deleted) {
        res.status(200).send({
          titulo: "Eliminado",
          mensaje: "Tarea eliminada correctamente",
          status: true,
        });
      } else {
        res.status(404).send({
          titulo: "Error",
          mensaje: "Tarea no encontrada",
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
