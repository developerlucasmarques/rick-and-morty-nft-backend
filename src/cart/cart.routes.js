import express from 'express';
import { authLoginMiddleware } from '../auth/auth.middleware.js';
import { createCartController } from './cart.controller.js';

export const cartRouter = express.Router();

cartRouter.post('/create/:id', authLoginMiddleware, createCartController);
