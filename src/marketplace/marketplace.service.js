import { Marketplace } from '../models/Marketplace.js';

const createSaleService = (userId, character) =>
  Marketplace.create({ user: userId, characters: character });

const addCharacterMarketplaceService = (userId, character) =>
  Marketplace.findOneAndUpdate(
    { user: userId },
    {
      $push: {
        characters: character,
      },
    }
  );

const findByIdMarketplaceUserService = (userId) =>
  Marketplace.findOne({ user: userId });

const findAllMarketplaceService = () => Marketplace.find();

const findByIdMarketplaceService = (characterId) => Marketplace.findOne({characterId})

const deleteCharacterMarketplaceService = (userId, characterId) =>
  Marketplace.findOneAndUpdate(
    { user: userId },
    {
      $pull: {
        characters: characterId,
      },
    }
  );

export {
  createSaleService,
  addCharacterMarketplaceService,
  findByIdMarketplaceUserService,
  findAllMarketplaceService,
  deleteCharacterMarketplaceService,
  findByIdMarketplaceService
};
