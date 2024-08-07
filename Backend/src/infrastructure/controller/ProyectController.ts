import { ProyectsCase } from "../../app/ProyectsCase";
import { Request, Response } from "express";

export class ProjectController {
  constructor(private readonly projectUseCase: ProyectsCase) {}

  /**
   * Get a project by ID
   * @param req
   * @param res
   */
  public getIdController = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const project = await this.projectUseCase.findProjectById(_id);

      if (project) {
        res.status(200).send({
          title: "Exitoso",
          message: "Proyecto Creado",
          project,
          status: true,
        });
      } else {
        res.status(400).send({
          title: "Error",
          message: "Proyecto no encontrado",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(500).send({
        title: "Error",
        error: `Database error: ${error.message}`,
        status: false,
      });
    }
  };

  /**
   * Create a new project
   * @param req
   * @param res
   */
  public insertController = async (req: Request, res: Response) => {
    try {
      const { name, description, startDate, endDate, status, team, tasks } =
        req.body;

      if (!name || !description || !startDate || !endDate) {
        return res.status(400).send({
          title: "Error",
          message: "Faltan campos obligatorios",
          status: false,
        });
      }

      const projectData = {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
        team,
        tasks,
      };

      const project = await this.projectUseCase.createProject(projectData);
      if (project) {
        res.status(200).send({
          title: "Éxito",
          message: "Proyecto creado con éxito",
          project,
          status: true,
        });
      } else {
        res.status(400).send({
          titulo: "Error",
          mensaje: "No se pudo crear el proyecto",
          estado: false,
        });
      }
    } catch (error: any) {
      res.status(500).send({
        title: "Error",
        error: `Database error: ${error.message}`,
        status: false,
      });
    }
  };

  /**
   * Get all projects
   * @param req
   * @param res
   */
  public getController = async (req: Request, res: Response) => {
    try {
      const projects = await this.projectUseCase.listProjects();
      res.status(200).send({
        title: "Todos los Proyectos",
        message: "Se han obtenido todos los proyectos",
        projects,
        status: true,
      });
    } catch (error: any) {
      res.status(500).send({
        title: "Error",
        error: `Database error: ${error.message}`,
        status: false,
      });
    }
  };

  /**
   * Update a project by ID
   * @param req
   * @param res
   */
  public updateController = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const { name, description, startDate, endDate, status, team, tasks } =
        req.body;

      const projectData = {
        name,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        status,
        team,
        tasks,
      };

      const project = await this.projectUseCase.updateProject({
        _id,
        ...projectData,
      });

      if (project) {
        res.status(200).send({
          title: "Éxito",
          message: "Proyecto actualizado con éxito",
          project,
          status: true,
        });
      } else {
        res.status(400).send({
          title: "Error",
          message: "Proyecto no encontrado",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(500).send({
        title: "Error",
        error: `Database error: ${error.message}`,
        status: false,
      });
    }
  };

  /**
   * Delete a project by ID
   * @param req
   * @param res
   */
  public deleteController = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const success = await this.projectUseCase.deleteProject(_id);

      if (success) {
        res.status(200).send({
          title: "Éxito",
          message: "Proyecto eliminado con éxito",
          status: true,
        });
      } else {
        res.status(400).send({
          title: "Error",
          message: "Proyecto no encontrado",
          status: false,
        });
      }
    } catch (error: any) {
      res.status(500).send({
        title: "Error",
        error: `Database error: ${error.message}`,
        status: false,
      });
    }
  };
}
