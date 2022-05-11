import { User } from '../models/User.js';

const findByEmailUserService = (email) => User.findOne({ email: email });

const findByUsernameUserService = (username) =>
  User.findOne({ username: username });

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) =>
  User.findById(idUser).select('+password');

const updateByIdUserService = async (idUser, body) => {
  try {
    const user = await Characters.findByIdAndUpdate(idUser, body).select(
      '+password'
    );
    const newUser = body;
    return [user, newUser];
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
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
