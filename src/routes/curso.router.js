import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  turnosPage,
  addTurnoPage,
  editTurnoPage,
  usuariosPage,
  usuariosAddPage,
  insert,
  update,
  remove,
  insertTurno,
  updateTurno,
  deleteTurno,
  insertUsuario,
  deleteUsuario,
} from "../controllers/curso.controller";

const cursoRouter = express.Router();

// paginas cursos
cursoRouter.get("/cursos", authRoutes, mainPage);
cursoRouter.get("/cursos/add", authRoutes, addPage);
cursoRouter.get("/cursos/edit/:id", authRoutes, editPage);

// paginas turnos
cursoRouter.get("/cursos/turnos/:id", authRoutes, turnosPage);
cursoRouter.get("/cursos/turnos/add/:id", authRoutes, addTurnoPage);
cursoRouter.get("/cursos/turnos/edit/:idcurs/:idturn", authRoutes, editTurnoPage);

// paginas usuarios
cursoRouter.get("/cursos/usuarios/:id", authRoutes, usuariosPage);
cursoRouter.get("/cursos/usuarios/add/:id", authRoutes, usuariosAddPage);

// proc cursos
cursoRouter.post("/cursos/insert", authRoutes, insert);
cursoRouter.post("/cursos/update", authRoutes, update);
cursoRouter.post("/cursos/delete", authRoutes, remove);

// proc turnos
cursoRouter.post("/cursos/turnos/insert", authRoutes, insertTurno);
cursoRouter.post("/cursos/turnos/update", authRoutes, updateTurno);
cursoRouter.post("/cursos/turnos/delete", authRoutes, deleteTurno);

// proc usuarios
cursoRouter.post("/cursos/usuarios/insert", authRoutes, insertUsuario);
cursoRouter.post("/cursos/usuarios/delete", authRoutes, deleteUsuario);

export default cursoRouter;