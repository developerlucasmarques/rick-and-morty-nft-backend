import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { findByIdUserService } from '../users/users.service.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'O token não foi informado! ' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: 'Token mal formatado!' });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    const user = await findByIdUserService(decoded.id);
    if (err || !user || !user.id) {
      return res.status(401).send({ message: 'Token inválido!' });
    }
    req.userID = user.id;

    return next();
  });
};
