import { Cart } from '../models/Cart.js';

const createCartService = (userId, finished) =>
  Cart.create({ user: userId, finished: finished });

const addCharacterCartService = (characterId) =>
  Cart.findOneAndUpdate({ $push: { characters: characterId } });

const findByIdCartUserService = (userId) => Cart.findOne({ user: userId });

const findByIdCartCharacterService = (characterId) =>
  Cart.findOne({ characters: characterId });

export {
  createCartService,
  findByIdCartUserService,
  addCharacterCartService,
  findByIdCartCharacterService,
};
