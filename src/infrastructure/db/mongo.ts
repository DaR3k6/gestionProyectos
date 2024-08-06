import { connect } from "mongoose";

const DB_URL = `${process.env.DB}`;

const conexion = async () => {
  try {
    await connect(DB_URL);
  } catch (error) {
    console.log(`Erorr en la conexion en la base de datos ${error}`);
    throw error;
  }
};

export default conexion;
