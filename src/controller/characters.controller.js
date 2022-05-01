import {
  createCharacterService,
  findAllCharactersService,
  findByIdCharacterService,
} from "../services/characters.service.js";

const createCharacterController = async (req, res) => {
  try {
    res.status(201).send(await createCharacterService(req.body));
  } catch (err) {
    res.status(500).send({ error: `${err.message}` });
  }
};

const findAllCharactersController = async (req, res) => {
  try {
    res.status(200).send(await findAllCharactersService());
  } catch (err) {
    res.status(500).send({ error: `${err.message}` });
  }
};

const findByIdCharacterController = async (req, res) => {
  try {
    res.status(200).send(await findByIdCharacterService(req.params.id));
  } catch (err) {
    res.status(500).send({ error: `${err.message}` });
  }
};

export {
  findAllCharactersController,
  createCharacterController,
  findByIdCharacterController,
};
