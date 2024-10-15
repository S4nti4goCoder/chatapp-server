import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { initSocketServer } from "./utils/index.js";

const app = express();
const server = http.createServer(app);
initSocketServer(server);

//Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export { server };
