import mongoose from "mongoose";

const GiveUpEventSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
    reason: String,
    triggeredAt: { type: Date, default: Date.now },
    aiResponse: String,
    imageUrl: String
  });
  
  export default mongoose.models.GiveUpEvent || mongoose.model('GiveUpEvent', GiveUpEventSchema);  