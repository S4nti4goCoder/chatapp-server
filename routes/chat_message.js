import express from "express";
import multiparty from "connect-multiparty";
import { ChatMessageController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const mdUpload = multiparty({ uploadDir: "./uploads/images" });
const api = express.Router();

api.post("/chat/message", [mdAuth.asureAuth], ChatMessageController.sendText);
api.post(
  "/chat/message/image",
  [mdAuth.asureAuth, mdUpload],
  ChatMessageController.sendImage
);

export const chatMessageRoutes = api;
