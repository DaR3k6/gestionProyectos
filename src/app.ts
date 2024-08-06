import "dotenv/config";
import express from "express";
import cors from "cors";
import conexion from "./infrastructure/db/mongo";
import userRouter from "./infrastructure/router/UserRoute";

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

conexion().then();
app.use(userRouter);

app.listen(port, () => {
  console.log(`El puerto es : ${port}`);
});
