import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  insert,
  remove,
} from "../controllers/calendario.controller";

const calendarioRouter = express.Router();

// paginas
calendarioRouter.get("/calendarios", authRoutes, mainPage);

// proc 
calendarioRouter.post("/calendarios/insert", authRoutes, insert);
calendarioRouter.post("/calendarios/delete", authRoutes, remove);

export default calendarioRouter;