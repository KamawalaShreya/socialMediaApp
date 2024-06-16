import { required } from "joi";
import mongoose from "mongoose";
let Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    postId: { type: Schema.Types.ObjectId, ref: "posts" },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Comment = new mongoose.model("comments", commentSchema);

export default Comment;
