import mongoose from 'mongoose';
import fetch from 'node-fetch';
import {
	findByNameCharacterService,
	findByIdCharacterService,
} from '../services/characters.service.js';

export const allCharacters = [];

const findAllCharactersApi = async () => {
	try {
		const allCharactersPromises = [];
		for (let i = 1; i <= 42; i++) {
			const apiResult = fetch(
				`https://rickandmortyapi.com/api/character?page=${i}`
			).then((apiResponse) => apiResponse.json());
			allCharactersPromises.push(apiResult);
		}
		const allCharactersListResolve = await Promise.all(allCharactersPromises);

		for (let i = 0; i < allCharactersListResolve.length; i++) {
			const charactersPage = allCharactersListResolve[i];
			for (let i of charactersPage.results) {
				const objectCharacter = { name: `${i.name}`, image: `${i.image}` };
				allCharacters.push(objectCharacter);
			}
		}
	} catch (err) {
		res.status(500).send({ error: `${err.message}` });
	}
};
findAllCharactersApi();

const verifyObjectBody = (req, res, next) => {
	if (!req.body.name || !req.body.price || !req.body.commission) {
		return res.status(404).send({
			message: 'Envie o nome, o valor e uma taxa de comissão para a NFT!',
		});
	}
	next();
};

const verifyCharacterTrue = (req, res, next) => {
	let boolean = false;
	for (let i of allCharacters) {
		if (req.body.name == i.name) {
			req.body.image = i.image;
			boolean = true;
			break;
		}
	}
	if (!boolean) {
		return res.status(400).send({ message: 'Insira um personagem real.' });
	}
	next();
};

const verifyCharacterExistInDb = async (req, res, next) => {
	try {
		const character = await findByNameCharacterService(req.body.name);
		if (character) {
			return res
				.status(400)
				.send({ message: 'Esse personagem já foi criado.' });
		}
		next();
	} catch (err) {
		res.status(500).send({ error: `${err.message}` });
	}
};

const verifyCharacterUpdateName = async (req, res, next) => {
	try {
		const character = await findByIdCharacterService(req.params.id);
		const newCharacter = await findByNameCharacterService(req.body.name);

		if (!newCharacter) {
			return next();
		}
		let check = false;
		if (character.name == newCharacter.name) {
			check = true;
		}
		if (newCharacter && !check) {
			return res
				.status(400)
				.send({ message: 'Esse personagem já foi criado.' });
		}
		next();
	} catch (err) {
		res.status(500).send({ error: `${err.message}` });
	}
};

const verifyIdExistInDb = async (req, res, next) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(400).send({ message: 'Id inválido.' });
		}
		const findId = await findByIdCharacterService(req.params.id);
		if (!findId) {
			return res.status(404).send({ message: 'Id não encontrado.' });
		}
		next();
	} catch (err) {
		res.status(500).send({ error: `${err.message}` });
	}
};

const verifyCommissionAmount = (req, res, next) => {
	if (req.body.commission > 80 || req.body.commission < 0) {
		return res
			.status(400)
			.send({ message: 'Defina uma comissão entre 1% e 80%.' });
	}
	next();
};

export {
	verifyObjectBody,
	verifyCharacterTrue,
	verifyCharacterExistInDb,
	verifyIdExistInDb,
	verifyCommissionAmount,
	verifyCharacterUpdateName,
};
