import express from "express";
import http from "http";
import { initSocketServer } from "./utils/index.js";

const app = express();
const server = http.createServer(app);
initSocketServer(server);

export { server };
