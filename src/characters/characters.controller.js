import {
  createCharacterService,
  deleteByIdCharacterService,
  findAllCharactersService,
  findByIdCharacterService,
  updateByIdCharacterService,
} from "./characters.service.js";

const createCharacterController = async (req, res) => {
  try {
    res.status(201).send(await createCharacterService(req.body));
  } catch (err) {
    res.status(500).send({ error: `${err.message}` });
  }
};

const findAllCharactersController = async (req, res) => {
  try {
    const char = await findAllCharactersService();

    if (char.length == 0) {
      return res
        .status(404)
        .send({ message: "Não existem personagens cadastrados." });
    }
    res.status(200).send(char);
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

const updateByIdCharacterController = async (req, res) => {
  try {
    res
      .status(200)
      .send(await updateByIdCharacterService(req.params.id, req.body));
  } catch (err) {
    res.status(500).send({ error: `${err.message}` });
  }
};

const deleteByIdCharacterController = async (req, res) => {
  try {
    const deleted = await deleteByIdCharacterService(req.params.id);
    if (!deleted.name) {
      res.send(404).send({
        message: `Não encontramos esse personagem em nossa lista. Talvez ele já tenha sido deletado.`,
      });
    }
    res.status(200).send({ message: `${deleted.name} deletado com sucesso!` });
  } catch (err) {
    res.status(500).send({ error: `${err.message}` });
  }
};

export {
  findAllCharactersController,
  createCharacterController,
  findByIdCharacterController,
  updateByIdCharacterController,
  deleteByIdCharacterController,
};
