import express from "express";
import {
  createCharacterController,
  findAllCharactersController,
  findByIdCharacterController,
} from "../controller/characters.controller.js";
import {
  verifyCharacterExistInMongo,
  verifyCharacterTrue,
  verifyObjectBody,
} from "../middlewares/characters.middlewares.js";

export const router = express.Router();

router.post(
  "/create",
  verifyObjectBody,
  verifyCharacterTrue,
  verifyCharacterExistInMongo,
  createCharacterController
);
router.get("/", findAllCharactersController);
router.get("/find/:id", findByIdCharacterController);
