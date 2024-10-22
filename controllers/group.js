import { Group } from "../models/index.js";
import { getFilePath } from "../utils/index.js";

function create(req, res) {
  const { user_id } = req.user;
  const group = new Group(req.body);
  group.creator = user_id;
  group.participants = JSON.parse(req.body.participants);
  group.participants = [...group.participants, user_id];

  if (req.files.image) {
    const imagePath = getFilePath(req.files.image);
    group.image = imagePath;
  }
  group
    .save()
    .then((groupStorage) => {
      if (!groupStorage) {
        return res.status(400).send({ msg: "Error al crear el grupo" });
      }
      res.status(201).send(groupStorage);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error del servidor", error });
    });
}

export const GroupController = {
  create,
};
