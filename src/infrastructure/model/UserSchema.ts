import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModels = mongoose.model("Usuario", usuarioSchema);

export default UserModels;
