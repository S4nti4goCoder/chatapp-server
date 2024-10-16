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
    .catch((error) => {
      res.status(400).send({ msg: "Error al registrar el usuario" });
    });
}

async function login(req, res) {
  const { email, password } = req.body;
  const emailLowerCase = email.toLowerCase();

  try {
    const userStorage = await User.findOne({ email: emailLowerCase });

    if (!userStorage) {
      return res.status(500).send({ msg: "Error del servidor" });
    }

    const check = await bscrypt.compare(password, userStorage.password);

    if (!check) {
      return res.status(400).send({ msg: "Contraseña incorrecta" });
    } else {
      return res.status(200).send(userStorage);
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

export const AuthController = {
  register,
  login,
};
