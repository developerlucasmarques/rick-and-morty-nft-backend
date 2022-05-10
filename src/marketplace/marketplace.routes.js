import express from 'express';
import { authLoginMiddleware } from '../auth/auth.middleware.js';
import { verifyIdExistInDb } from '../characters/characters.middlewares.js';
import {
  createSaleMarketplaceController,
  deleteCharacterMarketplaceController,
  findAllMarketplaceController,
  findByIdMarketplaceController,
} from './marketplace.controller.js';

export const marketplaceRouter = express.Router();

marketplaceRouter.post(
  '/create-sale-order/:id',
  authLoginMiddleware,
  createSaleMarketplaceController
);

marketplaceRouter.get(
  '/find',
  authLoginMiddleware,
  findAllMarketplaceController
);

marketplaceRouter.get(
  '/find/:id',
  authLoginMiddleware,
  verifyIdExistInDb,
  findByIdMarketplaceController
);

marketplaceRouter.put(
  '/delete-character/:id',
  authLoginMiddleware,
  deleteCharacterMarketplaceController
);
