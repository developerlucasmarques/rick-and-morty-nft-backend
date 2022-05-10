import express from 'express';
import {
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
} from '../auth/auth.middleware.js';
export const userRouter = express.Router();
import {
  createUserAdminController,
  createUserController,
  findAllUserController,
  findBydIdUserController,
  findPropertiesUserController,
  myAccountUserController,
} from './users.controller.js';

import {
  checkAllFields,
  verifyExistingUserByEmail,
  verifyExistingUserById,
} from './users.middlewares.js';

userRouter.post(
  '/create',
  checkAllFields,
  verifyExistingUserByEmail,
  createUserController
);

userRouter.post(
  '/create-admin',
  checkAllFields,
  verifyExistingUserByEmail,
  createUserAdminController
);

userRouter.get(
  '/find-all',
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
  findAllUserController
);
userRouter.get(
  '/find/:id',
  authLoginMiddleware,
  authVerifyUserAdminMiddleware,
  verifyExistingUserById,
  findBydIdUserController
);

userRouter.get('/my-account', authLoginMiddleware, myAccountUserController);
userRouter.get(
  '/find-properties',
  authLoginMiddleware,
  findPropertiesUserController
);
