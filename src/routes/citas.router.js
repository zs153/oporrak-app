import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  editPage,
  update,
  asign,
  verTodo,
} from "../controllers/cita.controller";

const citaRouter = express.Router();

// paginas
citaRouter.get("/citas", authRoutes, mainPage);
citaRouter.get("/citas/edit/:id", authRoutes, editPage);

// procedures
citaRouter.post("/citas/update", authRoutes, update);
citaRouter.post("/citas/asignar", authRoutes, asign);
citaRouter.get("/citas/vertodo", authRoutes, verTodo);

export default citaRouter;
