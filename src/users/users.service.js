import {User} from './User.js';

const createUserService = (body) => User.create(body);

export {
    createUserService,
}