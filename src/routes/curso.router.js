import express from "express";
import {
  curso,
  cursos,
  crear,
  modificar,
  borrar,
  turnosCurso,
  crearTurno,
  modificarTurno,
  borrarTurno,
  usuariosCurso,
  usuariosPendientes,
  crearUsuario,
  borrarUsuario
} from "../controllers/curso.controller";

const apiCursoRouter = express.Router();

// cursos
apiCursoRouter.post("/curso", curso);
apiCursoRouter.post("/cursos", cursos);
apiCursoRouter.post("/cursos/insert", crear);
apiCursoRouter.post("/cursos/update", modificar);
apiCursoRouter.post("/cursos/delete", borrar);

// turnos
apiCursoRouter.post('/cursos/turnos', turnosCurso)
apiCursoRouter.post('/cursos/turnos/insert', crearTurno)
apiCursoRouter.post('/cursos/turnos/update', modificarTurno)
apiCursoRouter.post('/cursos/turnos/delete', borrarTurno)

// usuarios
apiCursoRouter.post('/cursos/usuarios', usuariosCurso)
apiCursoRouter.post('/cursos/usuarios/pendientes', usuariosPendientes)
apiCursoRouter.post('/cursos/usuarios/insert', crearUsuario)
apiCursoRouter.post('/cursos/usuarios/delete', borrarUsuario)

export default apiCursoRouter;