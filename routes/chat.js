import express from "express";
import { ChatController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

api.post("/chat", [mdAuth.asureAuth], ChatController.create);
api.get("/chat", [mdAuth.asureAuth], ChatController.getAll);

export const chatRoutes = api;
