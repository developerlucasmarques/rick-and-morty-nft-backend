import { Characters } from '../models/Characters.js';

const findAllCharactersService = () => Characters.find().sort({ _id: -1 }).populate("user");

const createCharacterService = (body) => Characters.create(body);

const findByNameCharacterService = (name) => Characters.findOne({ name: name });

const findByIdCharacterService = (idParams) => Characters.findById(idParams);

const updateByIdCharacterService = async (idParams, body) => {
  try {
    const character = await Characters.findByIdAndUpdate(idParams, body);
    const newCharacter = body;
    return [character, newCharacter];
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err);
  }
};

const filterByNameCharacterService = async (name) =>
  Characters.find({ name: { $regex: `${name || ''}`, $options: 'i' } });

const deleteByIdCharacterService = (idParams) =>
  Characters.findByIdAndDelete(idParams);

export {
  findAllCharactersService,
  createCharacterService,
  findByNameCharacterService,
  findByIdCharacterService,
  updateByIdCharacterService,
  deleteByIdCharacterService,
  filterByNameCharacterService,
};
