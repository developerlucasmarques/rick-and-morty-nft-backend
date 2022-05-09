import { Marketplace } from '../models/Marketplace.js';

const createSaleService = (userId, character) =>
  Marketplace.create({ user: userId, characters: character });

export { createSaleService };
