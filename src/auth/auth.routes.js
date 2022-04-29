import express from "express";
export const authRouter = express.Router();
import { authLoginController } from "./auth.controller.js";

authRouter.post("/login", authLoginController);
