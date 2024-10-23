import express from "express";
import multiparty from "connect-multiparty";
import { GroupController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const mdUpload = multiparty({ uploadDir: "./uploads/group" });

const api = express.Router();

api.post("/group", [mdAuth.asureAuth, mdUpload], GroupController.create);
api.get("/group", [mdAuth.asureAuth], GroupController.getAll);
api.get("/group/:id", [mdAuth.asureAuth], GroupController.getGroup);
api.patch("/group/:id", [mdAuth.asureAuth, mdUpload], GroupController.updateGroup);

export const groupRoutes = api;
