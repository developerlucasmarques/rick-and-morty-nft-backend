import express from 'express';
import { addCharacterCartController } from './cart.controller.js';

export const cartRouter = express.Router();

cartRouter.post('/add', addCharacterCartController);
