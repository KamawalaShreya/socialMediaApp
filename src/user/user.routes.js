import express from "express";
import asyncHandler from "express-async-handler";
import validator from "../common/config/joi-validator";
import UserController from "./user.controller";
import storeFiles from "../common/middlewares/storeFile";
import updateUserDto from "./dtos/update-user.dto";
const router = express.Router();

router.put(
  "/",
  asyncHandler(storeFiles("media/user", "profileImage")),
  validator.body(updateUserDto),
  asyncHandler(UserController.updateUserData)
);

router.get("/", asyncHandler(UserController.getUserData));

router.post("/follow", asyncHandler(UserController.follow));

export default router;
