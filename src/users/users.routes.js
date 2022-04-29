import express from 'express';
export const userRouter = express.Router();
import { createUserController, findAllUserController } from './users.controller.js'

userRouter.post("/", createUserController);
userRouter.get("/", findAllUserController);