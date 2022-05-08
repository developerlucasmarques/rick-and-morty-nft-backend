import { Cart } from '../models/Cart.js';

const createCartService = (userId, finished) =>
  Cart.create({ user: userId, finished: finished });

const addCharacterCartService = (cartId, characterId) =>
  Cart.findOneAndUpdate(
    { _id: cartId },
    {
      $push: {
        characters: characterId,
      },
    }
  );

const findByIdCartUserService = (userId) => Cart.findOne({ user: userId });

const deleteCharacterCartService = (cartId, characterId) =>
  Cart.findOneAndUpdate(
    { _id: cartId },
    {
      $pull: {
        characters: characterId,
      },
    }
  );

export {
  createCartService,
  findByIdCartUserService,
  addCharacterCartService,
  deleteCharacterCartService,
};
