import {
  createCharacterService,
  findAllCharactersService,
} from "../services/characters.service.js";

const createCharacterController = async (req, res) => {
  try {
    res.status(201).send(await createCharacterService(req.body));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const findAllCharactersController = async (req, res) => {
  try {
    res.status(200).send(await findAllCharactersService());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { findAllCharactersController, createCharacterController };
