import mongoose from 'mongoose';
import {
  findByEmailUserService,
  findByUsernameUserService,
  findByIdUserService,
} from './users.service.js';

const checkAllFields = (req, res, next) => {
  const { name, username, email, password, photo } = req.body;
  if (!name || !username || !email || !password || !photo) {
    return res.status(400).send({
      message:
        "Alguns campos estão faltando. Os campos são: 'name', 'username', email, 'password' e 'photo'.",
    });
  }
  next();
};

const verifyExistingUserByEmail = async (req, res, next) => {
  try {
    const foundUserEmail = await findByEmailUserService(req.body.email);
    const foundUsername = await findByUsernameUserService(req.body.username);
    if (foundUserEmail || foundUsername) {
      return res.status(400).send({
        message: 'Esse usuário já existe!',
      });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err);
  }
};

const verifyExistingUserById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Id inválido!' });
    }
    const findId = await findByIdUserService(req.params.id);
    // console.log(findId.username)
    if (!findId) {
      return res.status(404).send({
        message: 'Não encontramos esse Id!',
      });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde',
    });
    console.log(err);
  }
};

export { checkAllFields, verifyExistingUserByEmail, verifyExistingUserById };
