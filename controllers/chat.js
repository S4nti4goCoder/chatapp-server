import { Chat } from "../models/index.js";

async function create(req, res) {
  const { participant_id_one, participant_id_two } = req.body;

  const foundOne = await Chat.findOne({
    participant_one: participant_id_one,
    participant_two: participant_id_two,
  });

  const foundTwo = await Chat.findOne({
    participant_one: participant_id_two,
    participant_two: participant_id_one,
  });

  if (foundOne || foundTwo) {
    res.status(200).send({ msg: "Ya tienes un chat con este usuario" });
    return;
  }

  const chat = new Chat({
    participant_one: participant_id_one,
    participant_two: participant_id_two,
  });

  chat
    .save()
    .then((chatStorage) => {
      res.status(201).send(chatStorage);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al crear el chat" });
    });
}

async function getAll(req, res) {
  const { user_id } = req.user;

  Chat.find({
    $or: [{ participant_one: user_id }, { participant_two: user_id }],
  })
    .populate("participant_one")
    .populate("participant_two")
    .then((chats) => {
      //Obtener la fecha del ultimo mensaje de cada chat
      res.status(200).send(chats);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al obtener los chats" });
    });
}

async function deleteChat(req, res) {
  const chat_id = req.params.id;
  
  Chat.findByIdAndDelete(chat_id)
  .then(() => {
    res.status(200).send({ msg: "Chat eliminado" });
  })
  .catch((error) => {
    res.status(400).send({ msg: "Error al eliminar el chat" });
  });
}

export const ChatController = {
  create,
  getAll,
  deleteChat,
};
