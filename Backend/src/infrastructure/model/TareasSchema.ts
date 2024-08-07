import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pendiente", "En progreso", "Completa"],
      default: "Pending",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("Tarea", tareaSchema);

export default TaskModel;
