import mongoose from "mongoose";
let Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    caption: {
      type: String,
      required: false,
    },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    files: [
      {
        type: String,
      },
    ],
    totalLikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Post = new mongoose.model("posts", postSchema);

export default Post;
