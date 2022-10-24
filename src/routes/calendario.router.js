import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  vacacionesPage,
  insert,
  update,
  remove,
} from "../controllers/calendario.controller";

const calendarioRouter = express.Router();

// paginas
calendarioRouter.get("/calendarios", authRoutes, mainPage);
calendarioRouter.get("/calendarios/add", authRoutes, addPage);
calendarioRouter.get("/calendarios/edit/:id", authRoutes, editPage);

// vacaciones page
calendarioRouter.post("/calendarios/calendario", authRoutes, vacacionesPage);

// proc 
calendarioRouter.post("/calendarios/insert", authRoutes, insert);
calendarioRouter.post("/calendarios/update", authRoutes, update);
calendarioRouter.post("/calendarios/delete", authRoutes, remove);


export default calendarioRouter;