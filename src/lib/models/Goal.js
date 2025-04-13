import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    deadline: Date,
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  });
  
  export default mongoose.models.Goal || mongoose.model('Goal', GoalSchema);
  