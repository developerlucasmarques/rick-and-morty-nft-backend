import express from 'express';
import {
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
} from '../auth/auth.middleware.js';
import {
  createCharacterController,
  deleteByIdCharacterController,
  findAllCharactersController,
  findByIdCharacterController,
  updateByIdCharacterController,
  filterByNameCharacterController,
} from './characters.controller.js';
import {
  verifyCharacterExistInDb,
  verifyCharacterTrue,
  verifyCommissionAmount,
  verifyIdExistInDb,
  verifyObjectBody,
  verifyCharacterUpdateName,
  uppercaseFirstLetter,
} from './characters.middlewares.js';

export const router = express.Router();

router.post(
  '/create',
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
  verifyObjectBody,
  verifyCharacterTrue,
  uppercaseFirstLetter,
  verifyCharacterExistInDb,
  verifyCommissionAmount,
  createCharacterController
);

router.get('/', authLoginMiddleware, findAllCharactersController);
router.get(
  '/find/:id',
  authLoginMiddleware,
  verifyIdExistInDb,
  findByIdCharacterController
);
router.get('/search', filterByNameCharacterController);

router.put(
  '/update/:id',
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
  verifyIdExistInDb,
  verifyObjectBody,
  verifyCharacterTrue,
  uppercaseFirstLetter,
  verifyCharacterUpdateName,
  verifyCommissionAmount,
  updateByIdCharacterController
);
router.delete(
  '/delete/:id',
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
  verifyIdExistInDb,
  deleteByIdCharacterController
);
