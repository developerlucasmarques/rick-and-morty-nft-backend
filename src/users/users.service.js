import { User } from '../models/User.js';

const findByEmailUserService = (email) => User.findOne({ email: email });

const findByUsernameUserService = (username) =>
  User.findOne({ username: username });

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) =>
  User.findById(idUser);

const findByAdminUserService = (admin) => User.findOne({ admin: admin });

const findByIdAndUpdateCoinsService = (idUser, newCoins) =>
  User.findByIdAndUpdate({ _id: idUser }, { coins: newCoins });

const findByAdminAndUpdateCoinsService = async (newCoins) => {
  await User.findOneAndUpdate({ admin: true }, { coins: newCoins });
};

const addCharactersUserService = async (idUser, characterId) =>
  await User.findOneAndUpdate(
    { _id: idUser },
    {
      $push: {
        characters: characterId,
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
  addCharactersUserService,
};
