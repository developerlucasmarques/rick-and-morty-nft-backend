import {
  findByIdUserService,
  // updateByIdPriceCharacterUser,
} from '../users/users.service.js';
import { createSaleService } from './marketplace.service.js';

const createSaleController = async (req, res) => {
  try {
    const user = await findByIdUserService(req.userId);
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

    // for (let i = 0; i < user.properties.length; i++) {
    //   if (user.properties[i]._id.equals(req.params.id)) {
    //      user.properties[i].price = req.body.price
    //      user.properties[i].price.save()
    //   }
    // }
    // console.log(user);

    // const update = await updateByIdPriceCharacterUser(
    //   req.userId,
    //   req.params.id,
    //   req.body.price
    // );
    // console.log(update);

    for (let i of user.properties) {
      if (i._id.equals(req.params.id)) {
        i.price = req.body.price;
        const userId = req.userId;
        const newI = i;
        await createSaleService(userId, newI);
      }
    }

    return res
      .status(201)
      .send({ message: 'Ordem de venda criada com sucesso' });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

export { createSaleController };
