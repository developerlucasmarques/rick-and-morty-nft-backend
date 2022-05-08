import express from 'express';
import { authLoginMiddleware } from '../auth/auth.middleware.js';
import { verifyIdExistInDb } from '../characters/characters.middlewares.js';
import {
  createAndAddCartController,
  deleteCharacterCartController,
  findAllCartCharactersController,
} from './cart.controller.js';
import { emptyCartMiddleware } from './cart.middleware.js';

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
  emptyCartMiddleware,
  findAllCartCharactersController
);
cartRouter.put(
  '/delete/:id',
  authLoginMiddleware,
  verifyIdExistInDb,
  emptyCartMiddleware,
  deleteCharacterCartController
);
