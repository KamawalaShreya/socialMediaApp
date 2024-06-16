import mongoose from "mongoose";
let Schema = mongoose.Schema;
const followSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    toUserId: { type: Schema.Types.ObjectId, ref: "posts" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Follow = new mongoose.model("follows", followSchema);

export default Follow;
