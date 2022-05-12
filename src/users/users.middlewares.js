import mongoose from 'mongoose';
import {
  findByEmailUserService,
  findByUsernameUserService,
  findByIdUserService,
} from './users.service.js';

const checkAllFields = (req, res, next) => {
  try {
    const { name, username, email, password, photo } = req.body;
    if (!name || !username || !email || !password || !photo) {
      return res.status(400).send({
        message:
          "Alguns campos estão faltando. Os campos são: 'name', 'username', email, 'password' e 'photo'.",
      });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message, ' - checkAllFields');
  }
};

const verifyExistingUser = async (req, res, next) => {
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
    console.log(err.message, ' - verifyExistingUser');
  }
};

const verifyExistingUserById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Id inválido!' });
    }
    const findId = await findByIdUserService(req.params.id);
    if (!findId) {
      return res.status(404).send({
        message: 'Não existem usuários com esse Id!',
      });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde',
    });
    console.log(err.message, ' - verifyExistingUserById');
  }
};

const verifyUserUpdate = async (req, res, next) => {
  try {
    const user = await findByIdUserService(req.userId);
    const newUsername = await findByUsernameUserService(req.body.username);
    const newEmail = await findByEmailUserService(req.body.email);

    if (!newUsername && !newEmail) {
      return next();
    }
    let checkUsername = false;
    let checkEmail = false;
    if (newUsername && (user.username == newUsername.username) || !newUsername) {
      checkUsername = true;
    }
    if (newEmail && (user.email == newEmail.email) || !newEmail) {
      checkEmail = true;
    }
    if (!checkUsername || !checkEmail) {
      return res
        .status(400)
        .send({ message: 'Username ou Email já cadastrados.' });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message, ' - verifyUserUpdate');
  }
};

export {
  checkAllFields,
  verifyExistingUser,
  verifyExistingUserById,
  verifyUserUpdate,
  // bcryptPassword,
};
