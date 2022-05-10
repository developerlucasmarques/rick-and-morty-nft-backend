import {
  deleteByIdCharacterService,
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
  findOneCartUserService,
  addCharacterCartService,
  deleteCharacterCartService,
  deleteCartService,
} from './cart.service.js';

import {
  createSaleService,
  findAllMarketplaceService,
  findByIdMarketplaceService,
} from '../marketplace/marketplace.service.js';

const createAndAddCartController = async (req, res) => {
  try {
    const character = await findByIdCharacterService(req.params.id);
    const allMarketplace = await findAllMarketplaceService();
    let checkCharacterAcquired = true;
    let checkCharacterMarketplace = false;

    if (!character.acquired) {
      checkCharacterAcquired = false;
    }
    for (let userSaleItems of allMarketplace) {
      for (let i of userSaleItems.characters) {
        if (i._id.equals(req.params.id)) {
          checkCharacterMarketplace = true;
        }
      }
    }

    if (checkCharacterAcquired && !checkCharacterMarketplace) {
      return res.status(400).send({ message: 'Essa NFT não está disponível.' });
    }

    const cartUser = await findOneCartUserService(req.userId);
    if (!checkCharacterAcquired && !checkCharacterMarketplace) {
      if (cartUser) {
        for (let i of cartUser.characters) {
          if (i._id.equals(req.params.id)) {
            return res
              .status(400)
              .send({ message: 'Essa NFT já foi adcionada ao carrinho.' });
          }
        }
        await addCharacterCartService(cartUser._id, character);
        return res
          .status(201)
          .send({ message: `${character.name} adicionado ao carrinho!` });
      }
      await createCartService(req.userId, character);
      return res
        .status(201)
        .send({ message: `Carrinho criado e ${character.name} adicionado!` });
    }

    if (checkCharacterAcquired && checkCharacterMarketplace) {
      res.status(201).send('ADICIONAR AO CARRINHO ITEM DO MARKETPLACE');
    }
    
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
      await addPropertiesUserService(req.userId, i);
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
