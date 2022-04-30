import {User} from '../models/User.js';

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser)

export {
    createUserService,
    findAllUserService,
    findByIdUserService,
}