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
  updateMyAccountUserController,
} from './users.controller.js';

import {
  checkAllFields,
  verifyExistingUser,
  verifyExistingUserById,
} from './users.middlewares.js';

userRouter.post(
  '/create',
  checkAllFields,
  verifyExistingUser,
  createUserController
);

userRouter.post(
  '/create-admin',
  checkAllFields,
  verifyExistingUser,
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
userRouter.put( 
  '/my-account', //swagger
  authLoginMiddleware,
  checkAllFields,
  verifyExistingUser,
  updateMyAccountUserController
);
userRouter.get(
  '/my-account/properties', //swagger
  authLoginMiddleware,
  findPropertiesUserController
);
