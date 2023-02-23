import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  update,
  calendario,
} from "../controllers/calendario.controller";

const calendarioRouter = express.Router();

// paginas
calendarioRouter.get("/calendarios/:idofic", authRoutes, mainPage);

// proc 
calendarioRouter.post("/calendarios/calendario/:idofic/:idusua", authRoutes, calendario);
calendarioRouter.post("/calendarios/update", authRoutes, update);

export default calendarioRouter;