import mongoose from "mongoose";
import {User} from "./User.js";

const checkAllFields = (req, res, next) => {
  const { name, username, email, password, avatar } = req.body;
  if (! name || !username || !email || !password || !avatar) {
    return res.status(400).send({
      message:
        "Alguns campos estão faltando. Os campos são: 'name', 'username', email, 'password' e 'avatar'.",
    });
  }
  next();
};

const verifyExistingUserByEmail = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res.status(400).send({
        message: "Usuário existente",
      });
    }
    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export { checkAllFields, verifyExistingUserByEmail };
