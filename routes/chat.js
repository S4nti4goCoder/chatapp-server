import express from "express";
import { ChatController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

api.post("/chat", [mdAuth.asureAuth], ChatController.create);

export const chatRoutes = api;
