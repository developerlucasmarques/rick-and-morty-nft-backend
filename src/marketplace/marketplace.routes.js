import express from 'express';
import { authLoginMiddleware } from '../auth/auth.middleware.js';
import {
  createSaleMarketplaceController,
  deleteCharacterMarketplaceController,
  findAllMarketplaceController,
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

marketplaceRouter.put('/delete-character/:id', authLoginMiddleware, deleteCharacterMarketplaceController)