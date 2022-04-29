import { createUserService } from "./users.service.js";

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
  res.send("find all");
};

export { createUserController, findAllUserController };
