import mongoose from "mongoose";
let Schema = mongoose.Schema;
const likeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    postId: { type: Schema.Types.ObjectId, ref: "posts" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Like = new mongoose.model("likes", likeSchema);

export default Like;
