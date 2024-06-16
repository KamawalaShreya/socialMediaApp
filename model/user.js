import mongoose from "mongoose";
let Schema = mongoose.Schema;

const user = new Schema(
  {
    email: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: false,
      default: null,
    },
    password: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
      default: null,
    },
    bio: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("users", user);

export default User;
