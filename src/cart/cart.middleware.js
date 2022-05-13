import { findOneCartUserService } from './cart.service.js';

const verifyEmptyCartMiddleware = async (req, res, next) => {
  try {
    const cart = await findOneCartUserService(req.userId);
    if (!cart || cart.characters.length == 0) {
      return res.status(404).send({ message: 'Carrinho está vazio' });
    }

    next();
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message, " - verifyEmptyCartMiddleware");
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
    console.log(err.message, " - verifyAdminCartMiddleware");
  }
};

export {
  verifyEmptyCartMiddleware,
};
