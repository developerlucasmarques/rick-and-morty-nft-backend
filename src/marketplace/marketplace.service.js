import { Marketplace } from '../models/Marketplace.js';
import mongoose from 'mongoose';

const createSaleService = (userId, characterId) =>
  Marketplace.create({ user: userId, characters: characterId });

const addCharacterMarketplaceService = (userId, characterId) =>
  Marketplace.findOneAndUpdate(
    { user: userId },
    {
      $push: {
        characters: characterId,
      },
    }
  );

const findByIdMarketplaceUserService = (userId) =>
  Marketplace.findOne({ user: userId });

const findAllMarketplaceService = () =>
  Marketplace.find().populate('characters');

const deleteCharacterMarketplaceService = (userId, characterId) =>
  Marketplace.findOneAndUpdate(
    { user: userId },
    {
      $pull: {
        characters: characterId,
      },
    }
  );

const findOneCharacterMarketplaceService = (idCharacter) =>
  Marketplace.findOne({
    characters: idCharacter,
  });

export {
  createSaleService,
  addCharacterMarketplaceService,
  findByIdMarketplaceUserService,
  findAllMarketplaceService,
  deleteCharacterMarketplaceService,
  findOneCharacterMarketplaceService,
};
