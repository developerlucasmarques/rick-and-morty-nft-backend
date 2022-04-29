import express from 'express';
export const userRouter = express.Router();
import { createUserController, findAllUserController } from './users.controller.js'
import {checkAllFields, verifyExistingUserByEmail} from './users.middlewares.js'

userRouter.post("/", checkAllFields, verifyExistingUserByEmail, createUserController);
userRouter.get("/", findAllUserController);