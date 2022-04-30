import express from "express";
export const userRouter = express.Router();
import {
  createUserController,
  findAllUserController,
  findBydIdUserController,
} from "./users.controller.js";

import {
  checkAllFields,
  verifyExistingUserByEmail,
  verifyExistingUserById,
} from "./users.middlewares.js";

userRouter.post(
  "/",
  checkAllFields,
  verifyExistingUserByEmail,
  createUserController
);
userRouter.get("/", findAllUserController);
userRouter.get("/:id", verifyExistingUserById, findBydIdUserController);
