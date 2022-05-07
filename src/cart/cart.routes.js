import express from 'express';
import { authLoginMiddleware } from '../auth/auth.middleware.js';
import {
  createAndAddCartController,
  findAllCartCharactersController,
} from './cart.controller.js';

export const cartRouter = express.Router();

cartRouter.post('/create/:id', authLoginMiddleware, createAndAddCartController);

cartRouter.get('/list', authLoginMiddleware, findAllCartCharactersController);

