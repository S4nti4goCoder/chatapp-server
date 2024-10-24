import { GroupMessage } from "../models/index.js";
import { io, getFilePath } from "../utils/index.js";

function sendText(req, res) {
  const { group_id, message } = req.body;
  const { user_id } = req.user;

  const group_message = new GroupMessage({
    group: group_id,
    user: user_id,
    message,
    type: "TEXT",
  });

  group_message
    .save()
    .then((group_message) => {
      return group_message.populate("user", "-password");
    })
    .then((data) => {
      io.sockets.in(group_id).emit("message", data);
      io.sockets.in(`${group_id}_notify`).emit("message_notify", data);
      res.status(201).send({});
    })
    .catch((error) => {
      res.status(500).send({ msg: "Error del servidor" });
    });
}

export const GroupMessageController = {
  sendText,
};
