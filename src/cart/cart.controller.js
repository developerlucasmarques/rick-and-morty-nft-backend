import {
  findByIdCharacterService,
  updateByIdAcquiredCharacterService,
} from '../characters/characters.service.js';
import {
  addPropertiesUserService,
  findByAdminAndUpdateCoinsService,
  findByAdminUserService,
  findByIdAndUpdateCoinsService,
  findByIdUserService,
} from '../users/users.service.js';
import {
  createCartService,
  findByIdCartUserService,
  addCharacterCartService,
  deleteCharacterCartService,
  deleteCartService,
} from './cart.service.js';

const createAndAddCartController = async (req, res) => {
  try {
    const character = await findByIdCharacterService(req.params.id);
    if (character.acquired) {
      return res
        .status(400)
        .send({ message: `${character.name} não está disponível.` });
    }
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

const findAllCartCharactersController = async (req, res) => {
  try {
    const cart = await findByIdCartUserService(req.userId);
    const characters = [];
    for (let i of cart.characters) {
      const character = await findByIdCharacterService(i);
      characters.push(character);
    }
    return res.status(200).send({ results: characters });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const deleteCharacterCartController = async (req, res) => {
  try {
    const cart = await findByIdCartUserService(req.userId);
    let check = false;
    for (let i of cart.characters) {
      if (i == req.params.id) {
        check = true;
      }
    }
    if (!check) {
      return res
        .status(400)
        .send({ message: 'Este item não existe no carrinho' });
    }

    await deleteCharacterCartService(cart._id, req.params.id);
    return res.status(200).send({ message: 'NFT deletada do carrinho' });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const buyCharactersCartController = async (req, res) => {
  try {
    const cart = await findByIdCartUserService(req.userId);
    const user = await findByIdUserService(req.userId);
    const characters = [];
    for (let i of cart.characters) {
      const character = await findByIdCharacterService(i);
      characters.push(character);
    }
    let totalPrice = 0;
    for (let i of characters) {
      totalPrice += i.price;
    }

    if (user.coins < totalPrice) {
      return res
        .status(400)
        .send({ message: 'Moedas insuficientes para fazer a compra' });
    }

    if (user.coins >= totalPrice) {
      for (let i of characters) {
        i.acquired = true;
        await updateByIdAcquiredCharacterService(i._id);
      }
      const newCoinsUser = user.coins - totalPrice;
      await findByIdAndUpdateCoinsService(req.userId, newCoinsUser);
      const admin = await findByAdminUserService(true);
      const newCoinsAdmin = admin.coins + totalPrice;
      findByAdminAndUpdateCoinsService(newCoinsAdmin);
    }

    for (let i of characters) {
      await addPropertiesUserService(req.userId, i);
    }

    for (let i = 0; i < characters.length; i++) {
      await deleteCharacterCartService(cart._id, cart.characters[i]);
    }
    await deleteCartService(cart._id);

    res.status(200).send({ message: 'Compra finalizada com sucesso' });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

export {
  createAndAddCartController,
  findAllCartCharactersController,
  deleteCharacterCartController,
  buyCharactersCartController,
};
