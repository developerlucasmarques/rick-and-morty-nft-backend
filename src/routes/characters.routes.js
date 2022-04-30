import express from "express";
import {
  createCharacterController,
  findAllCharactersController,
} from "../controller/characters.controller.js";

export const router = express.Router();

router.post("/create", createCharacterController);
router.get("/", findAllCharactersController);
