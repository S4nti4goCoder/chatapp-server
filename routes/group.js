import express from "express";
import multiparty from "connect-multiparty";
import { GroupController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const mdUpload = multiparty({ uploadDir: "./uploads/group" });

const api = express.Router();

api.post("/group", [mdAuth.asureAuth, mdUpload], GroupController.create);

export const groupRoutes = api;
