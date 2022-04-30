import {User} from '../models/User.js';

const createUserService = (body) => User.create(body);

const findAllUserService = () => User.find();

export {
    createUserService,
    findAllUserService,
}