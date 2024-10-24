import express from "express";
import multiparty from "connect-multiparty";
import { GroupMessageController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const mdUpload = multiparty({ uploadDir: "./uploads/images" });

const api = express.Router();

api.post("/group/message", [mdAuth.asureAuth], GroupMessageController.sendText);

export const groupMessageRoutes = api;
