import express from "express";
import {
  createCharacterController,
  findAllCharactersController,
} from "../controller/characters.controller.js";
import {
    verifyCharacterTrue,
  verifyObjectBody,
} from "../middlewares/characters.middlewares.js";

export const router = express.Router();

router.post(
  "/create",
  verifyObjectBody,
  verifyCharacterTrue,
  createCharacterController
);
router.get("/", findAllCharactersController);
