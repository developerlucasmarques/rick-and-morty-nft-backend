import express from 'express';
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
  verifyObjectBody,
  verifyCharacterTrue,
  verifyCharacterExistInDb,
  verifyCommissionAmount,
  createCharacterController
);
router.get('/', findAllCharactersController);
router.get('/find/:id', verifyIdExistInDb, findByIdCharacterController);
router.put(
  '/update/:id',
  verifyIdExistInDb,
  verifyObjectBody,
  verifyCharacterTrue,
  verifyCharacterUpdateName,
  verifyCommissionAmount,
  updateByIdCharacterController
);
router.get('/search', filterByNameCharacterController);
router.delete('/delete/:id', verifyIdExistInDb, deleteByIdCharacterController);
