import express from "express";
import {
  usuario,
  usuarios,
  crear,
  modificiar,
  borrar,
  cambio,
  olvido,
  perfil,
} from "../controllers/usuario.controller";

const apiUsuarioRouter = express.Router();

// usuarios
apiUsuarioRouter.post("/usuario", usuario);
apiUsuarioRouter.post("/usuarios", usuarios);
apiUsuarioRouter.post("/usuarios/insert", crear);
apiUsuarioRouter.post("/usuarios/update", modificiar);
apiUsuarioRouter.post("/usuarios/delete", borrar);
apiUsuarioRouter.post("/usuarios/cambio", cambio);
apiUsuarioRouter.post("/usuarios/forgot", olvido);
apiUsuarioRouter.post("/usuarios/perfil", perfil);

export default apiUsuarioRouter;