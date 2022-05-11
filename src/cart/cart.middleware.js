import mongoose from 'mongoose';
import { findOneCartUserService } from './cart.service.js';
import { findByIdUserService } from '../users/users.service.js';
import { findOneCharacterMarketplaceService } from '../marketplace/marketplace.service.js';
import { findByIdCharacterService } from '../characters/characters.service.js';

const verifyEmptyCartMiddleware = async (req, res, next) => {
  try {
    const cart = await findOneCartUserService(req.userId);
    if (!cart || cart.characters.length == 0) {
      return res.status(404).send({ message: 'Carrinho está vazio' });
    }
    return next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const verifyAdminCartMiddleware = async (req, res, next) => {
  try {
    const user = await findByIdUserService(req.userId);
    if (user.admin) {
      return res
        .status(401)
        .send({ message: 'Admin não tem permissão para comprar NFTs!' });
    }
    return next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const verifyIdExistDbAndMarketplace = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: 'Id inválido.' });
    }
    const characterMk = await findOneCharacterMarketplaceService(req.params.id);
    const characterPlatform = await findByIdCharacterService(req.params.id);
    if (!characterMk || characterPlatform.acquired) {
      return res.status(400).send({ message: 'Não está a disponível.' });
    }
    if (!characterMk || !characterPlatform) {
      return res.status(400).send({ message: 'Id inválido.' });
    }
    return next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

export {
  verifyEmptyCartMiddleware,
  verifyAdminCartMiddleware,
  verifyIdExistDbAndMarketplace,
};
