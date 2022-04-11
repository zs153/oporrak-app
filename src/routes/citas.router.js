import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  asignarCita,
  verTodo,
  changePassword,
  updatePerfil,
  editPage,
  updateCita,
} from "../controllers/cita.controller";

const citaRouter = express.Router();

// paginas
citaRouter.get("/citas", authRoutes, mainPage);
citaRouter.get("/citas/edit/:id", authRoutes, editPage);

// procedures
citaRouter.post("/citas/update", authRoutes, updateCita);
citaRouter.post("/citas/asignar", authRoutes, asignarCita);
citaRouter.get("/citas/vertodo", authRoutes, verTodo);
citaRouter.post("/citas/cambio", authRoutes, changePassword);
citaRouter.post("/citas/updatePerfil", authRoutes, updatePerfil);

export default citaRouter;
