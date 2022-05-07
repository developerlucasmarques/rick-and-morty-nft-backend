import { User } from '../models/User.js';

const findByEmailUserService = (email) => User.findOne({ email: email });

const findByUsernameUserService = (username) =>
  User.findOne({ username: username });

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const findByAdminUserService = (admin) => User.findOne({ admin: admin });

export {
  findByEmailUserService,
  createUserService,
  findAllUserService,
  findByIdUserService,
  findByUsernameUserService,
  findByAdminUserService,
};
