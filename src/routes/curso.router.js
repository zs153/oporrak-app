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
  usuariosTurnoPage,
  usuariosTurnoAddPage,
  insert,
  update,
  remove,
  insertTurno,
  updateTurno,
  deleteTurno,
  insertUsuario,
  deleteUsuario,
  insertUsuarioTurno,
  deleteUsuarioTurno,
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

// paginas usuarios turno
cursoRouter.get("/cursos/turnos/usuarios/:idcurs/:idturn", authRoutes, usuariosTurnoPage);
cursoRouter.get("/cursos/turnos/usuarios/add/:idcurs/:idturn", authRoutes, usuariosTurnoAddPage);

// proc cursos
cursoRouter.post("/cursos/insert", authRoutes, insert);
cursoRouter.post("/cursos/update", authRoutes, update);
cursoRouter.post("/cursos/delete", authRoutes, remove);

// proc turnos
cursoRouter.post("/cursos/turnos/insert", authRoutes, insertTurno);
cursoRouter.post("/cursos/turnos/update", authRoutes, updateTurno);
cursoRouter.post("/cursos/turnos/delete", authRoutes, deleteTurno);

// proc usuarios curso
cursoRouter.post("/cursos/usuarios/insert", authRoutes, insertUsuario);
cursoRouter.post("/cursos/usuarios/delete", authRoutes, deleteUsuario);

// proc usuarios turno
cursoRouter.post("/cursos/turnos/usuarios/insert", authRoutes, insertUsuarioTurno);
cursoRouter.post("/cursos/turnos/usuarios/delete", authRoutes, deleteUsuarioTurno);

export default cursoRouter;