import { Cart } from '../models/Cart.js';

const createCartService = (userId, character) =>
  Cart.create({ user: userId, characters: character });

const addCharacterCartService = (cartId, character) =>
  Cart.findOneAndUpdate(
    { _id: cartId },
    {
      $push: {
        characters: character,
      },
    }
  );

const findOneCartUserService = (userId) => Cart.findOne({ user: userId });

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
};
