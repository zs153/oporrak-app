import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  usuariosPage,
  usuariosAddPage,
  insert,
  update,
  remove,
  insertUsuario,
  deleteUsuario,
} from "../controllers/turno.controller";

const turnoRouter = express.Router();

// paginas
turnoRouter.get("/cursos/turnos", authRoutes, mainPage);
turnoRouter.get("/cursos/turnos/add", authRoutes, addPage);
turnoRouter.get("/cursos/turnos/edit/:id", authRoutes, editPage);

// paginas usuarios
turnoRouter.get("/cursos/turnos/usuarios/:idcurs/:idturn", authRoutes, usuariosPage);
turnoRouter.get("/cursos/turnos/usuarios/add/:idcurs/:idturn", authRoutes, usuariosAddPage);

// procedures
turnoRouter.post("/cursos/turnos/insert", authRoutes, insert);
turnoRouter.post("/cursos/turnos/update", authRoutes, update);
turnoRouter.post("/cursos/turnos/delete", authRoutes, remove);

// proc usuarios
turnoRouter.post("/cursos/usuarios/insert", authRoutes, insertUsuario);
turnoRouter.post("/cursos/usuarios/delete", authRoutes, deleteUsuario);

export default turnoRouter;
