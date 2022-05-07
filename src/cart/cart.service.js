import { Cart } from '../models/Cart.js';

const createCartService = (userId, finished) =>
  Cart.create({ user: userId, finished: finished });

const pushCartService = (characterId) =>
  Cart.findOneAndUpdate({ $push: { characters: characterId } });

const findOneCartService = (userId) => Cart.findOne({ user: userId });

export { createCartService, findOneCartService, pushCartService };
