import express from "express";
import authRoutes from "../middleware/auth";
import {
  userPage,
  adminPage,
  update,
  calendarioPage,
} from "../controllers/calendario.controller";

const calendarioRouter = express.Router();

// paginas
calendarioRouter.get("/calendario", authRoutes, userPage);
calendarioRouter.get("/calendarios", authRoutes, adminPage);
calendarioRouter.post("/calendarios/calendario", authRoutes, calendarioPage);

// proc
calendarioRouter.post("/calendarios/update", authRoutes, update);

export default calendarioRouter;