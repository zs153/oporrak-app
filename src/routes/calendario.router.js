import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  calendarioPage,
  update,
  calendariosPage,
} from "../controllers/calendario.controller";

const calendarioRouter = express.Router();

// paginas
calendarioRouter.get("/calendarios", authRoutes, mainPage);
calendarioRouter.get("/calendario/:id", authRoutes, calendarioPage);
calendarioRouter.get("/calendarios/:id", authRoutes, calendariosPage);

// proc 
calendarioRouter.post("/calendarios/update", authRoutes, update);

export default calendarioRouter;