import express from "express";
import {
  createCharacterController,
  findAllCharactersController,
} from "../controller/characters.controller.js";
import {
  verifyCharacterExist,
  verifyObjectBody,
} from "../middlewares/characters.middlewares.js";

export const router = express.Router();

router.post(
  "/create",
  verifyObjectBody,
  verifyCharacterExist,
  createCharacterController
);
router.get("/", findAllCharactersController);
