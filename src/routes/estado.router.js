import express from "express";
import authRoutes from "../middleware/auth";
import { mainPage, estadosPage, semanalPage } from "../controllers/estado.controller";

const estadoRouter = express.Router();

// paginas
estadoRouter.get("/estados", authRoutes, mainPage);

// proc
estadoRouter.post("/estados/estados", authRoutes, estadosPage);
estadoRouter.post("/estados/semanal", authRoutes, semanalPage);

export default estadoRouter;