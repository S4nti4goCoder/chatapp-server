import express from "express";
import { ChatController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

//Endpoints...

export const chatRoutes = api;
