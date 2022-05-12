import {
  findByIdCharacterService,
  updateByIdAcquiredCharacterService,
} from '../characters/characters.service.js';
import { findOneCharacterMarketplaceService } from '../marketplace/marketplace.service.js';
import {
  addCharactersUserService,
  findByAdminAndUpdateCoinsService,
  findByAdminUserService,
  findByIdAndUpdateCoinsService,
  findByIdUserService,
} from '../users/users.service.js';
import {
  createCartService,
  findOneCartUserService,
  addCharacterCartService,
  deleteCharacterCartService,
  deleteCartService,
} from './cart.service.js';

const createAndAddCartController = async (req, res) => {
  try {
    const user = await findByIdUserService(req.userId);
    if (user.admin) {
      return res
        .status(401)
        .send({ message: 'Admin não tem permissão para comprar NFTs!' });
    }

    const characterPlatform = await findByIdCharacterService(req.params.id);
    const characterMarketplace = await findOneCharacterMarketplaceService(
      req.params.id
    );
    if (!characterMarketplace && characterPlatform.acquired) {
      return res.status(400).send({ message: 'Não está a disponível.' });
    }

    const cart = await findOneCartUserService(req.userId);
    if (cart) {
      for (let i of cart.characters) {
        if (i.equals(req.params.id)) {
          return res.status(400).send({
            message: `${characterPlatform.name} já foi adcionada ao carrinho.`,
          });
        }
      }
      await addCharacterCartService(cart._id, characterPlatform._id);
      return res.status(201).send({
        message: `${characterPlatform.name} adicionado ao carrinho!`,
      });
    }

    await createCartService(req.userId, characterPlatform._id);
    return res.status(201).send({
      message: `Carrinho criado e ${characterPlatform.name} adicionado!`,
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
    const cart = await findOneCartUserService(req.userId);
    const characters = [];
    let total = 0;
    for (let i of cart.characters) {
      const character = await findByIdCharacterService(i);
      characters.push(character);
      total = total + character.price;
    }
    return res
      .status(200)
      .send({ results: characters, total: `Total da compra: ${total} coins` });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const deleteCharacterCartController = async (req, res) => {
  try {
    const cart = await findOneCartUserService(req.userId);
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
    const cart = await findOneCartUserService(req.userId);
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
        .send({ message: 'Moedas insuficientes para fazer a compra.' });
    }

    if (user.coins >= totalPrice) {
      for (let i of characters) {
        i.acquired = true;
        await updateByIdAcquiredCharacterService(i._id, user._id);
      }
      const newCoinsUser = user.coins - totalPrice;
      await findByIdAndUpdateCoinsService(req.userId, newCoinsUser);
      const admin = await findByAdminUserService(true);
      const newCoinsAdmin = admin.coins + totalPrice;
      findByAdminAndUpdateCoinsService(newCoinsAdmin);
    }

    for (let i of characters) {
      i.user = req.userId;
      await addCharactersUserService(req.userId, i);
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

// const market = await findByIdMarketplaceService(req.params.id);
// if (character.acquired && !market) {
//   return res
//     .status(400)
//     .send({ message: `${character.name} não está disponível.` });
// }
