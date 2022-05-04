import express from 'express';
import { authMiddleware } from '../auth/auth.middleware.js';
import {
  createCharacterController,
  deleteByIdCharacterController,
  findAllCharactersController,
  findByIdCharacterController,
  updateByIdCharacterController,
  filterByNameCharacterController
} from './characters.controller.js';
import {
  verifyCharacterExistInDb,
  verifyCharacterTrue,
  verifyCommissionAmount,
  verifyIdExistInDb,
  verifyObjectBody,
  verifyCharacterUpdateName,
} from './characters.middlewares.js';

export const router = express.Router();

router.post(
  '/create',
  authMiddleware,
  verifyObjectBody,
  verifyCharacterTrue,
  verifyCharacterExistInDb,
  verifyCommissionAmount,
  createCharacterController
);
router.get('/', authMiddleware, findAllCharactersController);
router.get('/find/:id', authMiddleware, verifyIdExistInDb, findByIdCharacterController);
router.put(
  '/update/:id',
  authMiddleware,
  verifyIdExistInDb,
  verifyObjectBody,
  verifyCharacterTrue,
  verifyCharacterUpdateName,
  verifyCommissionAmount,
  updateByIdCharacterController
);
router.get('/search', authMiddleware, filterByNameCharacterController);
router.delete('/delete/:id', authMiddleware, verifyIdExistInDb, deleteByIdCharacterController);
