import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Administrador", "Miembro", "Invitado"],
    default: "Miembro",
  },
  projects: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Projectos' }
  ],
  task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarea" }],
});

const UserModels = mongoose.model("Usuario", usuarioSchema);

export default UserModels;
