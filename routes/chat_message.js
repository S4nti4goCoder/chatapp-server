import express from "express";
import multiparty from "connect-multiparty";
import { ChatMessageController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const mdUploads = multiparty({ uploadDir: "./uploads/images" });
const api = express.Router();

export const chatMessageRoutes = api;
