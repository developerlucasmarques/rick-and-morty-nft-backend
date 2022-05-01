import { Characters } from "../models/Characters.js";

const findAllCharactersService = () => Characters.find();

const createCharacterService = (body) => Characters.create(body);

const findByNameCharacterService = (name) => Characters.findOne({ name: name });

const findByIdCharacterService = (idParams) => Characters.findById(idParams);

const updateByIdCharacterService = (idParams, body) =>
  Characters.findByIdAndUpdate(idParams, body);

const deleteByIdCharacterService = (idParams) =>
  Characters.findByIdAndDelete(idParams);

export {
  findAllCharactersService,
  createCharacterService,
  findByNameCharacterService,
  findByIdCharacterService,
  updateByIdCharacterService,
  deleteByIdCharacterService,
};
