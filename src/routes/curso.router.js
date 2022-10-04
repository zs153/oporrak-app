import express from "express";
import {
  curso,
  cursos,
  crear,
  modificar,
  borrar,
  turno,
  turnos,
  crearTurno,
  modificarTurno,
  borrarTurno,
  usuarios,
  usuariosPendientes,
  crearUsuario,
  borrarUsuario,
  usuariosTurno,
  usuariosTurnoPendientes,
  crearUsuarioTurno,
  borrarUsuarioTurno,
  turnoCurso,
} from "../controllers/curso.controller";

const apiCursoRouter = express.Router();

// cursos
apiCursoRouter.post("/curso", curso);
apiCursoRouter.post("/cursos", cursos);
apiCursoRouter.post("/cursos/insert", crear);
apiCursoRouter.post("/cursos/update", modificar);
apiCursoRouter.post("/cursos/delete", borrar);

// turnos
apiCursoRouter.post("/cursos/turno", turno);
apiCursoRouter.post('/cursos/turnos', turnos)
apiCursoRouter.post('/cursos/turnos/insert', crearTurno)
apiCursoRouter.post('/cursos/turnos/update', modificarTurno)
apiCursoRouter.post('/cursos/turnos/delete', borrarTurno)

// usuarios curso
apiCursoRouter.post('/cursos/usuarios', usuarios)
apiCursoRouter.post('/cursos/usuarios/pendientes', usuariosPendientes)
apiCursoRouter.post('/cursos/usuarios/insert', crearUsuario)
apiCursoRouter.post('/cursos/usuarios/delete', borrarUsuario)

// usuarios turno
apiCursoRouter.post('/cursos/turnos/usuarios', usuariosTurno)
apiCursoRouter.post('/cursos/turnos/usuarios/pendientes', usuariosTurnoPendientes)
apiCursoRouter.post('/cursos/turnos/usuarios/insert', crearUsuarioTurno)
apiCursoRouter.post('/cursos/turnos/usuarios/delete', borrarUsuarioTurno)

// turnocurso
apiCursoRouter.post('/cursos/turnocurso', turnoCurso)

export default apiCursoRouter;