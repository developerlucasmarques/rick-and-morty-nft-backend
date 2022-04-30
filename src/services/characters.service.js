import {Characters} from '../models/Characters.js'

const findAllCharactersService = () => Characters.find();

const createCharacterService = (body) => Characters.create(body);

export {
    findAllCharactersService,
    createCharacterService
}