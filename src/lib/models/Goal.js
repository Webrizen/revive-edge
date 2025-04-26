import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    deadline: Date,
    giveUpCount: { type: Number, default: 0 },    
    lastGiveUpAt: Date, 
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Goal || mongoose.model("Goal", GoalSchema);
