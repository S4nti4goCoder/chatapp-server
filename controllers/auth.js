import bscrypt from "bcryptjs";
import { User } from "../models/index.js";

function register(req, res) {
  const { email, password } = req.body;
  const user = new User({
    email: email.toLowerCase(),
  });

  const salt = bscrypt.genSaltSync(10);
  const hashPassword = bscrypt.hashSync(password, salt);
  user.password = hashPassword;
  
  user
    .save()
    .then((userStorage) => {
      res.status(201).send(userStorage);
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al registrar el usuario" });
    });
}

export const AuthController = {
  register,
};
