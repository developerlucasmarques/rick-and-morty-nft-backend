import { findByIdCharacterService } from '../characters/characters.service.js';
import {
  createCartService,
  findByIdCartUserService,
  addCharacterCartService,
} from './cart.service.js';

const createAndAddCartController = async (req, res) => {
  try {
    const character = await findByIdCharacterService(req.params.id);
    const cartUser = await findByIdCartUserService(req.userId);
    
    if (cartUser) {
      for (let i of cartUser.characters) {
        if (req.params.id == i) {
          return res
            .status(400)
            .send({ message: 'Você já adicionou essa NFT ao carrinho.' });
        }
      }
      await addCharacterCartService(cartUser._id, req.params.id);
      return res
        .status(201)
        .send({ message: `${character.name} foi adcionado(a) ao carrinho!` });
    }

    const cart = await createCartService(
      req.userId,
      (req.body.finished = false)
    );
    cart.characters.push(req.params.id);
    await cart.save();

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

export { createAndAddCartController };
