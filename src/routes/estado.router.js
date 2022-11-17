import express from "express";
import authRoutes from "../middleware/auth";
import { mainPage, semanalPage, mensualPage } from "../controllers/estado.controller";

const estadoRouter = express.Router();

// paginas
estadoRouter.get("/estados", authRoutes, mainPage);

// proc
estadoRouter.post("/estados/mensual", authRoutes, mensualPage);
estadoRouter.post("/estados/semanal", authRoutes, semanalPage);

export default estadoRouter;