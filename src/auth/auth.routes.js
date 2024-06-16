import express from "express";
import AuthController from "./auth.controller";
import asyncHandler from "express-async-handler";
import authenticateUser from "../common/middlewares/authenticate-user";
import validator from "../common/config/joi-validator";
import registerUserDto from "./dtos/register-user.dto";
import storeFiles from "../common/middlewares/storeFile";
import loginUserDto from "./dtos/login-user.dto";

const router = express.Router();

router.post(
  "/login",
  validator.body(loginUserDto),
  asyncHandler(AuthController.loginUser)
);

router.post(
  "/register",
  asyncHandler(storeFiles("media/user", "profileImage")),
  validator.body(registerUserDto),
  asyncHandler(AuthController.registerUser)
);

router.post(
  "/logout",
  authenticateUser,
  asyncHandler(AuthController.logoutUser)
);

export default router;
