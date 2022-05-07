import {
  createCharacterService,
  deleteByIdCharacterService,
  findAllCharactersService,
  findByIdCharacterService,
  updateByIdCharacterService,
  filterByNameCharacterService,
} from './characters.service.js';

const createCharacterController = async (req, res) => {
  try {
    req.body.user = req.userId;
    req.body.acquired = false;
    const character = await createCharacterService(req.body);
    return res
      .status(201)
      .send({ message: 'NFT criada com sucesso!', character: character });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const findAllCharactersController = async (req, res) => {
  try {
    const characters = await findAllCharactersService();

    if (characters.length == 0) {
      return res
        .status(404)
        .send({ message: 'Não encontramos personagens cadastrados.' });
    }
    return res.status(200).send({
      results: characters.map((element) => ({
        id: element._id,
        name: element.name,
        image: element.image,
        price: element.price,
        commission: element.commission,
      })),
    });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const findByIdCharacterController = async (req, res) => {
  try {
    return res.status(200).send(await findByIdCharacterService(req.params.id));
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const updateByIdCharacterController = async (req, res) => {
  try {
    return res
      .status(200)
      .send(await updateByIdCharacterService(req.params.id, req.body));
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const deleteByIdCharacterController = async (req, res) => {
  try {
    const deleted = await deleteByIdCharacterService(req.params.id);
    if (!deleted.name) {
      return res.send(404).send({
        message: `Não encontramos esse personagem em nossa lista. Talvez ele já tenha sido deletado.`,
      });
    }
    return res
      .status(200)
      .send({ message: `${deleted.name} deletado com sucesso!` });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

const filterByNameCharacterController = async (req, res) => {
  try {
    let { name } = req.query;
    name = name.trim();
    const filterByName = await filterByNameCharacterService(name);
    console.log(filterByName);
    if (filterByName.length === 0) {
      return res
        .status(404)
        .send({ message: 'Desconhecemos esse personagem.' });
    }

    return res.send({
      Characters: filterByName.map((character) => ({
        id: character._id,
        name: character.name,
        image: character.image,
        price: character.price,
        comission: character.comission,
      })),
    });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err.message);
  }
};

export {
  findAllCharactersController,
  createCharacterController,
  findByIdCharacterController,
  updateByIdCharacterController,
  deleteByIdCharacterController,
  filterByNameCharacterController,
};
