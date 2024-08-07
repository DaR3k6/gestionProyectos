import "dotenv/config";
import express from "express";
import cors from "cors";
import conexion from "./infrastructure/db/mongo";
import userRouter from "./infrastructure/router/UserRoute";
import proyectRouter from "./infrastructure/router/ProyectRoute";
import taskRouter from "./infrastructure/router/TaskRoute";

// Inicializa la aplicación Express
const port = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS
app.use(userRouter);
app.use(proyectRouter);
app.use(taskRouter);

// Conecta a MongoDB
const startServer = async () => {
  try {
    await conexion();
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto: ${port}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
    process.exit(1);
  }
};
startServer();
