import mongoose from 'mongoose';
import fetch from 'node-fetch';
import {
  findByNameCharacterService,
  findByIdCharacterService,
} from './characters.service.js';

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
    console.log(err.message, ' - findAllCharactersApi');
  }
};

findAllCharactersApi();

const verifyObjectBody = (req, res, next) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.commission) {
      return res.status(400).send({
        message: 'Existem campos vazios.',
      });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message, " - verifyObjectBody");
  }
};

const verifyCharacterTrue = (req, res, next) => {
  try {
    req.body.name = req.body.name.trim();
    let boolean = false;
    for (let i of allCharacters) {
      if (req.body.name.toLowerCase() == i.name.toLowerCase()) {
        req.body.image = i.image;
        boolean = true;
        break;
      }
    }
    if (!boolean) {
      return res.status(400).send({ message: 'Insira um personagem real.' });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message, " - verifyCharacterTrue");
  }
};

const verifyCharacterExistInDb = async (req, res, next) => {
  try {
    const character = await findByNameCharacterService(req.body.name);
    if (character) {
      return res
        .status(400)
        .send({ message: 'Esse personagem já foi criado.' });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message, " - verifyCharacterExistInDb");
  }
};

const verifyCharacterUpdateName = async (req, res, next) => {
  try {
    const character = await findByIdCharacterService(req.params.id);
    const newCharacter = await findByNameCharacterService(req.body.name);

    if (!newCharacter) {
      return next();
    }
    let check = false;
    if (character.name == newCharacter.name) {
      check = true;
    }
    if (newCharacter && !check) {
      return res
        .status(400)
        .send({ message: 'Esse personagem já foi criado.' });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message, " - verifyCharacterUpdateName");
  }
};

const verifyIdExistInDb = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Id inválido.' });
    }
    const findId = await findByIdCharacterService(req.params.id);
    if (!findId) {
      return res.status(404).send({ message: 'Id não encontrado.' });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message, " - verifyIdExistInDb");
  }
};

const verifyCommissionAmount = (req, res, next) => {
  try {
    if (req.body.commission > 80 || req.body.commission < 0) {
      return res
        .status(400)
        .send({ message: 'Defina uma comissão entre 1% e 80%.' });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message, " - verifyCommissionAmount");
  }
};

const uppercaseFirstLetter = (req, res, next) => {
  try {
    const reqName = req.body.name.split(' ');
    const nameUpdatedArray = [];
    for (let i = 0; i < reqName.length; i++) {
      let name = reqName[i];
      const nameUpdated = name[0].toUpperCase() + name.slice(1).toLowerCase();
      nameUpdatedArray.push(nameUpdated);
    }
    let nameOk = '';
    for (let i = 0; i < nameUpdatedArray.length; i++) {
      nameOk = nameOk + nameUpdatedArray[i] + ' ';
    }
    req.body.name = nameOk.trim();
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message, " - uppercaseFirstLetter");
  }
};

export {
  verifyObjectBody,
  verifyCharacterTrue,
  verifyCharacterExistInDb,
  verifyIdExistInDb,
  verifyCommissionAmount,
  verifyCharacterUpdateName,
  uppercaseFirstLetter,
};
