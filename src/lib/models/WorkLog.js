import mongoose from "mongoose";

const WorkLogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationInHours: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.WorkLog || mongoose.model("WorkLog", WorkLogSchema);