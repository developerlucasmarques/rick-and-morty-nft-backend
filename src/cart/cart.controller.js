import {
  findByIdCharacterService,
  updateByIdAcquiredUserCharacterService,
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
  findAllCharactersCartUserService,
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
        if (i == req.params.id) {
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
    const cart = await findAllCharactersCartUserService(req.userId);
    let total = 0;
    for (let i of cart.characters) {
      total += i.price;
    }
    return res.status(200).send({
      results: cart.characters,
      total: `Total da compra: ${total} coins`,
    });
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
    for (let i of cart.characters) {
      if (i != req.params.id) {
        return res
          .status(400)
          .send({ message: 'Este item não existe no carrinho' });
      }
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
    const cart = await findAllCharactersCartUserService(req.userId);
    const user = await findByIdUserService(req.userId);

    let total = 0;
    for (let i of cart.characters) {
      total += i.price;
    }

    if (user.coins < total) {
      return res
        .status(400)
        .send({ message: 'Moedas insuficientes para fazer a compra.' });
    }

    const adm = await findByAdminUserService(true);
    let admNewCoins = adm.coins;
    let userNewCoins = user.coins;

    for (let i of cart.characters) {
      if (!i.acquired) {
        admNewCoins += i.price;
        userNewCoins -= i.price;

        await updateByIdAcquiredUserCharacterService(i._id, req.userId);
        await addCharactersUserService(req.userId, i._id);
      } else {
        const userSeller = await findByIdUserService(i.user);
        const commission = i.price * (i.commission / 100);
        const newCoinsUserSeller = userSeller.coins + (i.price - commission);
        admNewCoins += commission;
        userNewCoins -= i.price;

        await findByIdAndUpdateCoinsService(i.user, newCoinsUserSeller);
        await updateByIdAcquiredUserCharacterService(i._id, req.userId);
        await addCharactersUserService(req.userId, i._id);
      }
    }

    await findByAdminAndUpdateCoinsService(admNewCoins);
    await findByIdAndUpdateCoinsService(req.userId, userNewCoins);

    await deleteCartService(cart._id)
    return res.status(200).send({ message: 'Compra finalizada com sucesso.' });
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
