import {} from "dotenv/config";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const authLoginService = (email) => {
  return User.findOne({ email: email }).select("+password");
};

const authGenerateTokenService = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: 86400 });
};

export { authLoginService, authGenerateTokenService };
