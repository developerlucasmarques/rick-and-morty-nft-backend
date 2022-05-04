import {
  createCharacterService,
  deleteByIdCharacterService,
  findAllCharactersService,
  findByIdCharacterService,
  updateByIdCharacterService,
  filterByNameCharacterService
} from './characters.service.js';


const createCharacterController = async (req, res) => {
  try {
    res.status(201).send(await createCharacterService(req.body));
  } catch (err) {
    res.status(500).semd({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err);
  }
};

const findAllCharactersController = async (req, res) => {
  try {
    const char = await findAllCharactersService();

    if (char.length == 0) {
      return res
        .status(404)
        .send({ message: 'Não existem personagens cadastrados.' });
    }
    res.status(200).send(char);
  } catch (err) {
    res.status(500).semd({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err);
  }
};

const findByIdCharacterController = async (req, res) => {
  try {
    res.status(200).send(await findByIdCharacterService(req.params.id));
  } catch (err) {
    res.status(500).semd({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err);
  }
};

const updateByIdCharacterController = async (req, res) => {
  try {
    res
      .status(200)
      .send(await updateByIdCharacterService(req.params.id, req.body));
  } catch (err) {
    res.status(500).semd({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err);
  }
};

const deleteByIdCharacterController = async (req, res) => {
  try {
    const deleted = await deleteByIdCharacterService(req.params.id);
    if (!deleted.name) {
      res.send(404).send({
        message: `Não encontramos esse personagem em nossa lista. Talvez ele já tenha sido deletado.`,
      });
    }
    res.status(200).send({ message: `${deleted.name} deletado com sucesso!` });
  } catch (err) {
    res.status(500).semd({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err);
  }
};

const filterByNameCharacterController = async (req, res) => {
  try {
    const filterByName = await filterByNameCharacterService(req.query);

    if (filterByName.length === 0) {
      return res
        .status(404)
        .send({ message: 'Desconhecemos esse personagem.' });
    }
    // res.send(filterByName)
    res.send({
      Characters: filterByName.map((map) => ({
        id: map._id,
        name: map.name,
        price: map.price,
        comission: map.comission,
        image: map.image
      }))
    });
  } catch (err) {
    res.status(500).send({
      message: 'Ops, tivemos um pequeno problema. Tente novamente mais tarde.',
    });
    console.log(err);
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
