import { User } from "../models/User.js";

const findByEmailUserService = (email) => User.findOne({ email: email });

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

export {
  findByEmailUserService,
  createUserService,
  findAllUserService,
  findByIdUserService,
};
