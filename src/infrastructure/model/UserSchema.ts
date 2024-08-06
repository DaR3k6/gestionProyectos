import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: mongoose.Schema.Types.ObjectId, ref: "Rol" },
    proyectos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Proyecto" }],
  },
  {
    timestamps: true,
  }
);

const UserModels = mongoose.model("Usuario", usuarioSchema);

export default UserModels;
