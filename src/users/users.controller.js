import { createUserService, findAllUserService } from "./users.service.js";

const createUserController = async (req, res) => {
  try {
    req.body.coins = 1000;
    const user = await createUserService(req.body);
    if (!user) {
      return res.status(400).send({
        message: "Erro ao criar usuário!",
      });
    }
    res.status(201).send(user);
  } catch (err) {
    console.log(err.message);
  }
};

const findAllUserController = async (req, res) => {
  const users = await findAllUserService();
  if (users.length == 0) {
    return res
      .status(400)
      .send({ message: "Não existem usuários cadastrados." });
  }
  res.status(200).send(users)
};

export { createUserController, findAllUserController };
