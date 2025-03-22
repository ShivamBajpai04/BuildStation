import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerk_id: { type: String, required: true, unique: true },
    user_name: { type: String },
    email: { type: String, required: true, unique: true },
    wallet_address: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
