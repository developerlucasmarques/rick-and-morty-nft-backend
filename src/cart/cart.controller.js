import { findByIdCharacterService } from '../characters/characters.service.js';
import {
  createCartService,
  findOneCartService,
  pushCartService,
} from './cart.service.js';

const createCartController = async (req, res) => {
  try {
    const character = await findByIdCharacterService(req.params.id);
    const user = await findOneCartService(req.userId);
    if (user) {
      await pushCartService(req.params.id);
      return res
        .status(201)
        .send({ message: `${character.name} foi adcionado(a) ao carrinho!` });
    }
    
    req.body.finished = false;
    await createCartService(req.userId, req.body.finished);
    await pushCartService(req.params.id);

    return res.status(201).send({
      message: `Carrinho criado e ${character.name} adcionado(a)!`,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

export { createCartController };
