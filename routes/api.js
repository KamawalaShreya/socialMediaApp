import express from "express";
import authRoutes from "../src/auth/auth.routes";
import userRoutes from "../src/user/user.routes";
import authenticateUser from "../src/common/middlewares/authenticate-user";
import postRoutes from "../src/post/post.routes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/user", authenticateUser, userRoutes);

router.use("/post", authenticateUser, postRoutes);

export default router;
