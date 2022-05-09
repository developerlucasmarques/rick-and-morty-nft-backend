import express from 'express';
import { authLoginMiddleware } from '../auth/auth.middleware.js';
import {
  createSaleController,
  deleteCharacterMarketplaceController,
  findAllMarketplaceController,
} from './marketplace.controller.js';

export const marketplaceRouter = express.Router();

marketplaceRouter.post(
  '/create-sale-order/:id',
  authLoginMiddleware,
  createSaleController
);

marketplaceRouter.get(
  '/find',
  authLoginMiddleware,
  findAllMarketplaceController
);

marketplaceRouter.put('/delete-character/:id', authLoginMiddleware, deleteCharacterMarketplaceController)