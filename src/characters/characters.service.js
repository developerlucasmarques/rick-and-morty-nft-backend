import { Characters } from '../models/Characters.js';

const findAllCharactersService = () => Characters.find();

const createCharacterService = (body) => Characters.create(body);

const findByNameCharacterService = (name) => Characters.findOne({ name: name });

const findByIdCharacterService = (idParams) => Characters.findById(idParams);

const updateByIdCharacterService = async (idParams, body) => {
  try {
    const character = await Characters.findByIdAndUpdate(idParams, body);
    const newCharacter = body;
    return [character, newCharacter];
  } catch (err) {
    res.status(500).semd({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde',
    });
    console.log(err);
  }
};

const filterByNameCharacterService = (name) =>
  Characters.find({ $regex: `${name || ''}`, $options: 'i' }).sort();

const deleteByIdCharacterService = (idParams) =>
  Characters.findByIdAndDelete(idParams);

export {
  findAllCharactersService,
  createCharacterService,
  findByNameCharacterService,
  findByIdCharacterService,
  updateByIdCharacterService,
  deleteByIdCharacterService,
  filterByNameCharacterService
};
