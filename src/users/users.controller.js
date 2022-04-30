import dotenv from 'dotenv';
import { authGenerateTokenService } from "../auth/auth.service.js";
import { createUserService, findAllUserService } from "./users.service.js";

dotenv.config();

const createUserController = async (req, res) => {
  try {
    req.body.coins = 1000;
    const { name, username, email, avatar, coins} = req.body
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
        avatar,
        coins,
      },
      token,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const findAllUserController = async (req, res) => {
  try {
    const users = await findAllUserService();
    if (users.length == 0) {
      return res
        .status(400)
        .send({ message: "Não existem usuários cadastrados." });
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { createUserController, findAllUserController };
