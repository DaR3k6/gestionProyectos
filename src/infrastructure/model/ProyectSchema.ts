import mongoose from "mongoose";

const proyectoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["No iniciado", "En progreso", "Completo"],
    default: "No iniciado",
  },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarea" }],
});

const ProjectModel = mongoose.model("Proyecto", proyectoSchema);

export default ProjectModel;
