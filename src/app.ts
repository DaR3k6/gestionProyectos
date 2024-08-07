import "dotenv/config";
import express from "express";
import cors from "cors";
import conexion from "./infrastructure/db/mongo";
import userRouter from "./infrastructure/router/UserRoute";

//CONEXION MIDDLEAWRE
const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//CONECTO LA BASE DE DATOS
conexion().then();

//RUTAS
app.use(userRouter);

app.listen(port, () => {
  console.log(`El puerto es : ${port}`);
});
