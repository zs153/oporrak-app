import express from "express";
import {verifyTokenAndAdmin} from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  turnosPage,
  addTurnoPage,
  editTurnoPage,
  usuariosPage,
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
  matriculasPage,
  addMatriculaPage,
  editMatriculaPage,
  insertMatricula,
  updateMatricula,
  deleteMatricula,
  usuariosMatriculaPage,
  insertUsuarioMatricula,
  deleteUsuarioMatricula,
  usuariosAddPage,
} from "../controllers/admin/curso.controller";

const cursoRouter = express.Router();

// paginas cursos
cursoRouter.get("/cursos", verifyTokenAndAdmin, mainPage);
cursoRouter.get("/cursos/add", verifyTokenAndAdmin, addPage);
cursoRouter.get("/cursos/edit/:id", verifyTokenAndAdmin, editPage);

// paginas turnos
cursoRouter.get("/cursos/turnos/:id", verifyTokenAndAdmin, turnosPage);
cursoRouter.get("/cursos/turnos/add/:id", verifyTokenAndAdmin, addTurnoPage);
cursoRouter.get("/cursos/turnos/edit/:idcurs/:idturn", verifyTokenAndAdmin, editTurnoPage);

// paginas matriculas
cursoRouter.get("/cursos/matriculas/:id", verifyTokenAndAdmin, matriculasPage);
cursoRouter.get("/cursos/matriculas/add/:id", verifyTokenAndAdmin, addMatriculaPage);
cursoRouter.get("/cursos/matriculas/edit/:idcurs/:idmatr", verifyTokenAndAdmin, editMatriculaPage);

// paginas usuarios
cursoRouter.get("/cursos/usuarios/:id", verifyTokenAndAdmin, usuariosPage);
cursoRouter.get("/cursos/usuarios/add/:idcurs", verifyTokenAndAdmin, usuariosAddPage);

// paginas usuarios turno
cursoRouter.get("/cursos/turnos/usuarios/:idcurs/:idturn", verifyTokenAndAdmin, usuariosTurnoPage);
cursoRouter.get("/cursos/turnos/usuarios/add/:idcurs/:idturn", verifyTokenAndAdmin, usuariosTurnoAddPage);

// paginas usuarios matricula
cursoRouter.get("/cursos/matriculas/usuarios/:idcurs/:idmatr", verifyTokenAndAdmin, usuariosMatriculaPage);

// proc cursos
cursoRouter.post("/cursos/insert", verifyTokenAndAdmin, insert);
cursoRouter.post("/cursos/update", verifyTokenAndAdmin, update);
cursoRouter.post("/cursos/delete", verifyTokenAndAdmin, remove);

// proc turnos
cursoRouter.post("/cursos/turnos/insert", verifyTokenAndAdmin, insertTurno);
cursoRouter.post("/cursos/turnos/update", verifyTokenAndAdmin, updateTurno);
cursoRouter.post("/cursos/turnos/delete", verifyTokenAndAdmin, deleteTurno);

// proc matriculas
cursoRouter.post("/cursos/matriculas/insert", verifyTokenAndAdmin, insertMatricula);
cursoRouter.post("/cursos/matriculas/update", verifyTokenAndAdmin, updateMatricula);
cursoRouter.post("/cursos/matriculas/delete", verifyTokenAndAdmin, deleteMatricula);

// proc usuarios curso
cursoRouter.post("/cursos/usuarios/insert", verifyTokenAndAdmin, insertUsuario);
cursoRouter.post("/cursos/usuarios/delete", verifyTokenAndAdmin, deleteUsuario);

// proc usuarios turno
cursoRouter.post("/cursos/turnos/usuarios/insert", verifyTokenAndAdmin, insertUsuarioTurno);
cursoRouter.post("/cursos/turnos/usuarios/delete", verifyTokenAndAdmin, deleteUsuarioTurno);

// proc usuarios matricula
cursoRouter.post("/cursos/matriculas/usuarios/insert", verifyTokenAndAdmin, insertUsuarioMatricula);
cursoRouter.post("/cursos/matriculas/usuarios/delete", verifyTokenAndAdmin, deleteUsuarioMatricula);

export default cursoRouter;