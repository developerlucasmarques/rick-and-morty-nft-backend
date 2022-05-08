import express from 'express';
import { authLoginMiddleware } from '../auth/auth.middleware.js';
import { verifyIdExistInDb } from '../characters/characters.middlewares.js';
import {
  buyCharactersCartController,
  createAndAddCartController,
  deleteCharacterCartController,
  findAllCartCharactersController,
} from './cart.controller.js';
import { verifyEmptyCartMiddleware } from './cart.middleware.js';

export const cartRouter = express.Router();

cartRouter.post(
  '/create/:id',
  authLoginMiddleware,
  verifyIdExistInDb,
  createAndAddCartController
);

cartRouter.get(
  '/list',
  authLoginMiddleware,
  verifyEmptyCartMiddleware,
  findAllCartCharactersController
);

cartRouter.put(
  '/delete/:id',
  authLoginMiddleware,
  verifyIdExistInDb,
  verifyEmptyCartMiddleware,
  deleteCharacterCartController
);
cartRouter.put(
  '/buy',
  authLoginMiddleware,
  verifyEmptyCartMiddleware,
  buyCharactersCartController
);
