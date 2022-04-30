import { User } from "../users/User.js";

const authLoginService = (email) => User.findOne({ email: email }).select("+password");

export { authLoginService };
