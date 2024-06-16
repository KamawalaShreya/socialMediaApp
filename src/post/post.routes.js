import express from "express";
import asyncHandler from "express-async-handler";
import validator from "../common/config/joi-validator";
import storeMultipleFile from "../common/middlewares/storeMultipleFile";
import authenticateUser from "../common/middlewares/authenticate-user";
import PostController from "./post.controller";
import createPostDto from "./dtos/create-post.dto";
const router = express.Router();

router.get("/", asyncHandler(PostController.index));
const postFields = [{ name: "files", destination: "media/posts" }];
router.post(
  "/",
  storeMultipleFile(postFields),
  validator.body(createPostDto),
  asyncHandler(PostController.create)
);

router.put(
  "/",
  storeMultipleFile(postFields),
  validator.body(createPostDto),
  asyncHandler(PostController.updatePost)
);

router.delete("/", asyncHandler(PostController.deletePost));

router.post("/like", asyncHandler(PostController.like));
router.post("/comment", asyncHandler(PostController.comment));

export default router;
