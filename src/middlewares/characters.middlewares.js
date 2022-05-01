import fetch from "node-fetch";
import { findByNameCharacterService } from "../services/characters.service.js";

export const allCharacters = [];

const findAllCharactersApi = async () => {
  try {
    const allCharactersPromises = [];
    for (let i = 1; i <= 42; i++) {
      const apiResult = fetch(
        `https://rickandmortyapi.com/api/character?page=${i}`
      ).then((apiResponse) => apiResponse.json());
      allCharactersPromises.push(apiResult);
    }
    const allCharactersListResolve = await Promise.all(allCharactersPromises);

    for (let i = 0; i < allCharactersListResolve.length; i++) {
      const charactersPage = allCharactersListResolve[i];
      for (let i of charactersPage.results) {
        const objectCharacter = { name: `${i.name}`, image: `${i.image}` };
        allCharacters.push(objectCharacter);
      }
    }
  } catch (err) {
    res.status(500).send({ error: `${err.message}` });
  }
};
findAllCharactersApi();

const verifyObjectBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(404).send({ message: "Envie o nome do personagem!" });
  }
  next();
};

const verifyCharacterTrue = (req, res, next) => {
  let boolean = false;
  for (let i of allCharacters) {
    if (req.body.name == i.name) {
      req.body.image = i.image;
      boolean = true;
      break;
    }
  }
  if (!boolean) {
    return res.status(400).send({ message: "Insira um personagem real." });
  }
  next();
};

const verifyCharacterExistInMongo = async (req, res, next) => {
  try {
    const character = await findByNameCharacterService(req.body.name);
    if (character) {
      return res
        .status(400)
        .send({ message: "Esse personagem já foi criado." });
    }
    next();
  } catch (err) {
    res.status(500).send({ error: `${err.message}` });
  }
};

const verifyIdExistInMongo = async (req, res, next) => {
  try {
  } catch (err) {
    res.status(500).send({ error: `${err.message}` });
  }
};

export { verifyObjectBody, verifyCharacterTrue, verifyCharacterExistInMongo };
