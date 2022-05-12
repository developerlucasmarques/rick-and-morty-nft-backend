import { findByIdCharacterService } from '../characters/characters.service.js';
import { findByIdUserService } from '../users/users.service.js';
import {
  addCharacterMarketplaceService,
  createSaleService,
  deleteCharacterMarketplaceService,
  findAllMarketplaceService,
  findByIdMarketplaceUserService,
} from './marketplace.service.js';

const createSaleMarketplaceController = async (req, res) => {
  try {
    const user = await findByIdUserService(req.userId);
    if (!user || user.characters.length == 0) {
      return res.satus(404).send({ message: 'Não possui NFTs' });
    }
    for (let i of user.characters) {
      if (i !== req.params.id) {
        return res
          .status(400)
          .send({ message: 'Essa NFT não é sua propriedade' });
      }
    }
    if (!req.body.price || isNaN(req.body.price)) {
      return res.status(400).send({ message: 'Digite um valor para venda' });
    }

    const userMarketplace = await findByIdMarketplaceUserService(req.userId);
    const characterPlatform = await findByIdCharacterService(req.params.id);

    if (userMarketplace) {
      for (let i of userMarketplace.characters) {
        if (i == req.params.id) {
          return res
            .status(400)
            .send({ message: `${characterPlatform.name} já está à venda.` });
        }
      }
      characterPlatform.price = req.body.price;
      await characterPlatform.save();
      await addCharacterMarketplaceService(req.userId, req.params.id);
      return res.status(201).send({
        message: `${characterPlatform.name} adcionado ao marketplace.`,
      });
    }

    characterPlatform.price = req.body.price;
    await characterPlatform.save();
    await createSaleService(req.userId, req.params.id);
    return res
      .status(201)
      .send({ message: `${characterPlatform.name} adcionado ao marketplace.` });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const findAllMarketplaceController = async (req, res) => {
  try {
    const marketplaceAll = await findAllMarketplaceService();
    if (!marketplaceAll || marketplaceAll.length == 0) {
      return res.status(404).send({ message: 'Marketplace vazio' });
    }
    return res.status(200).send({ results: marketplaceAll });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const findByIdMarketplaceController = async (req, res) => {
  try {
    return res
      .status(200)
      .send(await findByIdMarketplaceService(req.params.id));
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const deleteCharacterMarketplaceController = async (req, res) => {
  try {
    const userMarketplace = await findByIdMarketplaceUserService(req.userId);
    if (!userMarketplace) {
      return res
        .status(404)
        .send({ message: 'Nenhum produto adicionado ao Marketplace.' });
    }
    let check = false;
    for (let i of userMarketplace.characters) {
      if (i._id.equals(req.params.id)) {
        check = true;
      }
    }
    if (!check) {
      return res
        .status(400)
        .send({ message: 'Você ainda não tem este item à venda.' });
    }

    for (let i = 0; i < userMarketplace.characters.length; i++) {
      if (userMarketplace.characters[i]._id.equals(req.params.id)) {
        await deleteCharacterMarketplaceService(
          req.userId,
          userMarketplace.characters[i]
        );
        return res.status(200).send({
          message: `${userMarketplace.characters[i].name} deletada do Marketplace.`,
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

export {
  createSaleMarketplaceController,
  findAllMarketplaceController,
  deleteCharacterMarketplaceController,
  findByIdMarketplaceController,
};
