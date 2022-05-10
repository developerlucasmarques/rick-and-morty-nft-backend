import { findByIdUserMorePasswordService } from '../users/users.service.js';
import {
  addCharacterMarketplaceService,
  createSaleService,
  deleteCharacterMarketplaceService,
  findAllMarketplaceService,
  findByIdMarketplaceUserService,
  findByIdMarketplaceService,
} from './marketplace.service.js';

const createSaleMarketplaceController = async (req, res) => {
  try {
    const user = await findByIdUserMorePasswordService(req.userId);
    if (!user || user.properties.length == 0) {
      return res.satus(404).send({ message: 'Não possui NFTs' });
    }

    let check = false;
    for (let i of user.properties) {
      if (i._id.equals(req.params.id)) {
        check = true;
      }
    }
    if (!check) {
      return res
        .status(400)
        .send({ message: 'Essa NFT não é sua propriedade' });
    }
    if (!req.body.price || isNaN(req.body.price)) {
      return res.status(400).send({ message: 'Digite um valor para venda' });
    }

    const userMarketplace = await findByIdMarketplaceUserService(req.userId);
    if (userMarketplace) {
      for (let i of userMarketplace.characters) {
        if (i._id.equals(req.params.id)) {
          return res
            .status(400)
            .send({ message: `${i.name} já está à venda.` });
        }
      }
      for (let i of user.properties) {
        if (i._id.equals(req.params.id)) {
          i.price = req.body.price;
          await addCharacterMarketplaceService(req.userId, i);
          return res
            .status(201)
            .send({ message: `${i.name} adcionado ao marketplace.` });
        }
      }
    }

    for (let i = 0; i < user.properties.length; i++) {
      if(user.properties[i]._id.equals(req.params.id)){
        user.properties[i].price = req.body.price;
        user.markModified('properties');
        await user.save();
      }
    }

    for (let i of user.properties) {
      if (i._id.equals(req.params.id)) {
        i.price = req.body.price;
        await createSaleService(req.userId, i);
        return res
          .status(201)
          .send({ message: `${i.name} adcionado ao marketplace.` });
      }
    }
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
