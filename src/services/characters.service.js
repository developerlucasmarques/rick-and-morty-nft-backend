import { Characters } from "../models/Characters.js";

const findAllCharactersService = () => Characters.find();

const createCharacterService = (body) => Characters.create(body);

const findCharacterByNameService = (name) => Characters.findOne({ name: name });

const findByIdCharacterService = (idParams) => Characters.findById(idParams);

export {
  findAllCharactersService,
  createCharacterService,
  findCharacterByNameService,
  findByIdCharacterService,
};
