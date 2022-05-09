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

export const characterRouter = express.Router();

characterRouter.post(
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

characterRouter.get('/', authLoginMiddleware, findAllCharactersController);
characterRouter.get(
  '/find/:id',
  authLoginMiddleware,
  verifyIdExistInDb,
  findByIdCharacterController
);
characterRouter.get('/search', filterByNameCharacterController);

characterRouter.put(
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
characterRouter.delete(
  '/delete/:id',
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
  verifyIdExistInDb,
  deleteByIdCharacterController
);
