import express from "express";
import {
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
} from "../auth/auth.middleware.js";
export const userRouter = express.Router();
import {
  createUserAdminController,
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
  "/create",
  checkAllFields,
  verifyExistingUserByEmail,
  createUserController
);

userRouter.post(
  "/create-admin",
  checkAllFields,
  verifyExistingUserByEmail,
  createUserAdminController
);

userRouter.get(
  "/",
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
  findAllUserController
);
userRouter.get(
  "/:id",
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
  verifyExistingUserById,
  findBydIdUserController
);
