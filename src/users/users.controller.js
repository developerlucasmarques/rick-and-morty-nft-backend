import dotenv from "dotenv";
import { authGenerateTokenService } from "../auth/auth.service.js";
import {
  createUserService,
  findAllUserService,
  findByIdUserService,
} from "./users.service.js";

dotenv.config();

const createUserController = async (req, res) => {
  try {
    req.body.coins = 1000;
    req.body.admin = false;
    const { name, username, email, photo, coins, admin } = req.body;
    const user = await createUserService(req.body);
    if (!user) {
      return res.status(400).send({
        message: "Erro ao criar usuário!",
      });
    }

    const token = await authGenerateTokenService(user.id);

    res.status(201).send({
      user: {
        id: user.id,
        name,
        username,
        email,
        photo,
        coins,
        admin,
      },
      token,
    });
  } catch (err) {
    res.status(500).semd({
      message: "Ops, tivemos um pequeno problema. Tente novamente mais tarde.",
    });
    console.log(err.message);
  }
};

const createUserAdminController = async (req, res) => {
  try {
    req.body.coins = 0;
    req.body.admin = true;
    const { name, username, email, photo, coins, admin } = req.body;
    const user = await createUserService(req.body);
    if (!user) {
      return res.status(400).send({
        message: "Erro ao criar usuário!",
      });
    }

    const token = await authGenerateTokenService(user.id);

    res.status(201).send({
      user: {
        id: user.id,
        name,
        username,
        email,
        photo,
        coins,
        admin,
      },
      token,
    });
  } catch (err) {
    res.status(500).semd({
      message: "Ops, tivemos um pequeno problema. Tente novamente mais tarde.",
    });
    console.log(err.message);
  }
};

const findAllUserController = async (req, res) => {
  try {
    const users = await findAllUserService();
    if (users.length == 0) {
      return res
        .status(404)
        .send({ message: "Não existem usuários cadastrados." });
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).semd({
      message: "Ops, tivemos um pequeno problema. Tente novamente mais tarde.",
    });
    console.log(err.message);
  }
};

const findBydIdUserController = async (req, res) => {
  try {
    res.status(200).send(await findByIdUserService(req.params.id));
  } catch (err) {
    res.status(500).semd({
      message: "Ops, tivemos um pequeno problema. Tente novamente mais tarde.",
    });
    console.log(err.message);
  }
};

export {
  createUserController,
  findAllUserController,
  findBydIdUserController,
  createUserAdminController,
};
