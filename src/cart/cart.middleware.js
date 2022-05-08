import { findByIdCartUserService } from './cart.service.js';

const verifyEmptyCartMiddleware = async (req, res, next) => {
  try {
    const cart = await findByIdCartUserService(req.userId);
    if (!cart || cart.characters.length == 0) {
      return res.status(404).send({ message: 'Carrinho está vazio' });
    }
    next();
  } catch (err) {}
};

export { verifyEmptyCartMiddleware };
