import { Characters } from "../models/Characters.js";

const findAllCharactersService = () => Characters.find();

const createCharacterService = (body) => Characters.create(body);

const findByNameCharacterService = (name) => Characters.findOne({ name: name });

const findByIdCharacterService = (idParams) => Characters.findById(idParams);

export {
  findAllCharactersService,
  createCharacterService,
  findByNameCharacterService,
  findByIdCharacterService,
};
