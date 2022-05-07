import dotenv from 'dotenv';
import { authGenerateTokenService, authLoginService } from './auth.service.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const authLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authLoginService(email);
    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Senha inválida.' });
    }

    const token = authGenerateTokenService(user.id);

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).semd({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

export { authLoginController };
