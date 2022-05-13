import { Cart } from '../models/Cart.js';

const createCartService = (userId, characterId) =>
  Cart.create({ user: userId, characters: characterId });

const addCharacterCartService = (cartId, characterId) =>
  Cart.findOneAndUpdate(
    { _id: cartId },
    {
      $push: {
        characters: characterId,
      },
    }
  );

const findOneCartUserService = (userId) => Cart.findOne({ user: userId });

const findAllCharactersCartUserService = (userId) =>
  Cart.findOne({ user: userId }).populate('characters');

const deleteCharacterCartService = (cartId, characterId) =>
  Cart.findOneAndUpdate(
    { _id: cartId },
    {
      $pull: {
        characters: characterId,
      },
    }
  );

const deleteCartService = (idCart) => Cart.findByIdAndDelete(idCart);

export {
  createCartService,
  findOneCartUserService,
  addCharacterCartService,
  deleteCharacterCartService,
  deleteCartService,
  findAllCharactersCartUserService
};
