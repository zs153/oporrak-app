import express from "express";
import {
  turno,
  turnos,
  crear,
  modificar,
  borrar,
  usuariosTurno,
  usuariosPendientes,
  crearUsuario,
  borrarUsuario,
  turnoCurso
} from "../controllers/turno.controller";

const apiTurnoRouter = express.Router();

// turnos
apiTurnoRouter.post("/turno", turno);
apiTurnoRouter.post("/turnos", turnos);
apiTurnoRouter.post("/turnos/insert", crear);
apiTurnoRouter.post("/turnos/update", modificar);
apiTurnoRouter.post("/turnos/delete", borrar);

// usuarios
apiTurnoRouter.post('/turnos/usuarios', usuariosTurno)
apiTurnoRouter.post('/turnos/usuarios/pendientes', usuariosPendientes)
apiTurnoRouter.post('/turnos/usuarios/insert', crearUsuario)
apiTurnoRouter.post('/turnos/usuarios/delete', borrarUsuario)

// turnocurso
apiTurnoRouter.post('/turnocurso', turnoCurso)

export default apiTurnoRouter;
