import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true, index: true },
  email: String,
  name: String,
  plan: { type: String, enum: ["free", "pro"], default: "free" },
  badges: { type: [String], default: [] },
  giveUpCredits: {
    type: Number,
    default: 1,
  },
  level: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
