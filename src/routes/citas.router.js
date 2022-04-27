import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  editPage,
  update,
  asign,
  verTodo,
  citasOficina,
} from "../controllers/cita.controller";

const citaRouter = express.Router();

// paginas
citaRouter.get("/citas", authRoutes, mainPage);
citaRouter.get("/citas/edit/:id", authRoutes, editPage);

// procedures
citaRouter.get("/citas/vertodo", authRoutes, verTodo);
citaRouter.get("/citas/oficina/:id", authRoutes, citasOficina);
citaRouter.post("/citas/update", authRoutes, update);
citaRouter.post("/citas/asignar", authRoutes, asign);

export default citaRouter;
