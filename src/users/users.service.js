import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';

const findByEmailUserService = (email) => User.findOne({ email: email });

const findByUsernameUserService = (username) =>
  User.findOne({ username: username });

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) =>
  User.findById(idUser).select('+password');

const updateByIdUserService = async (idUser, body) => {
  
  body.password = await bcrypt.hash(body.password, 10);
  const user = await User.findByIdAndUpdate(idUser, body).select('+password');
  
  return user, body;
};

const findByIdUserMorePasswordService = (idUser) =>
  User.findById(idUser).select('+password');

const findByAdminUserService = (admin) => User.findOne({ admin: admin });

const findByIdAndUpdateCoinsService = (idUser, newCoins) =>
  User.findByIdAndUpdate({ _id: idUser }, { coins: newCoins });

const findByAdminAndUpdateCoinsService = async (newCoins) => {
  await User.findOneAndUpdate({ admin: true }, { coins: newCoins });
};

const addPropertiesUserService = async (idUser, characters) =>
  await User.findOneAndUpdate(
    { _id: idUser },
    {
      $push: {
        properties: characters,
      },
    }
  );

export {
  findByEmailUserService,
  createUserService,
  findAllUserService,
  findByIdUserService,
  findByUsernameUserService,
  findByAdminUserService,
  findByIdAndUpdateCoinsService,
  findByAdminAndUpdateCoinsService,
  addPropertiesUserService,
  findByIdUserMorePasswordService,
  updateByIdUserService,
};
