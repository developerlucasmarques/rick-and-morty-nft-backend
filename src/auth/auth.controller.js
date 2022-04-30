import { authLoginService } from "./auth.service.js";
import bcrypt from "bcryptjs";

const authLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authLoginService(email);
    if (!user) {
      return res.status(400).send({ message: "Usuário não encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Senha inválida." });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { authLoginController };
