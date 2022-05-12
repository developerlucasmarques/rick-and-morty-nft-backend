import { findOneCartUserService } from './cart.service.js';

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

export {
  verifyEmptyCartMiddleware,
};
