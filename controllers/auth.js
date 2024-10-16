import bscrypt from "bcryptjs";
import { User } from "../models/index.js";
import { jwt } from "../utils/index.js";

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
      return res.status(200).send({
        access: jwt.createAccessToken(userStorage),
        refresh: jwt.createRefreshToken(userStorage),
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).send({ msg: "Token requerido" });
  }

  const hasExpired = jwt.hasExpiredToken(refreshToken);
  if (hasExpired) {
    return res.status(400).send({ msg: "Token expirado" });
  }

  const { user_id } = jwt.decoded(refreshToken);
  try {
    const userStorage = await User.findById(user_id);
    return res.status(200).send({
      accessToken: jwt.createAccessToken(userStorage),
    });
  } catch (error) {
    return res.status(500).send({ msg: "Error del servidor" });
  }
}

export const AuthController = {
  register,
  login,
  refreshAccessToken,
};
