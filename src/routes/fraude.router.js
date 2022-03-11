import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPageFraude,
  addPageFraude,
  editPageFraude,
  ejercicioPageFraude,
  hitosPageFraude,
  addPageHitoFraude,
  insertFraude,
  updateFraude,
  deleteFraude,
  asignarFraude,
  changePasswordFraude,
  updatePerfilFraude,
  resolverFraude,
  remitirFraude,
  desadjudicarFraude,
  verTodoFraude,
  smsFraude,
  ejercicioFraude,
  insertHitoFraude,
} from "../controllers/fraude.controller";

const fraudeRouter = express.Router();

// paginas
fraudeRouter.get("/fraudes", authRoutes, mainPageFraude);
fraudeRouter.get("/fraudes/add", authRoutes, addPageFraude);
fraudeRouter.get("/fraudes/edit/:id", authRoutes, editPageFraude);
fraudeRouter.get("/fraudes/ejercicio/:id", authRoutes, ejercicioPageFraude);
fraudeRouter.get("/fraudes/hitos/:id", authRoutes, hitosPageFraude);
fraudeRouter.get("/fraudes/addhitos", authRoutes, addPageHitoFraude);
fraudeRouter.get("/fraudes/vertodo", authRoutes, verTodoFraude);

// procedures
fraudeRouter.post("/fraudes/insert", authRoutes, insertFraude);
fraudeRouter.post("/fraudes/update", authRoutes, updateFraude);
fraudeRouter.post("/fraudes/delete", authRoutes, deleteFraude);
fraudeRouter.post("/fraudes/asignar", authRoutes, asignarFraude);
fraudeRouter.post("/fraudes/resolver", authRoutes, resolverFraude);
fraudeRouter.post("/fraudes/remitir", authRoutes, remitirFraude);
fraudeRouter.post("/fraudes/desadjudicar", authRoutes, desadjudicarFraude);
fraudeRouter.post("/fraudes/sms", authRoutes, smsFraude);
fraudeRouter.post("/fraudes/ejercicio", authRoutes, ejercicioFraude);
fraudeRouter.post("/fraudes/hitos/insert", authRoutes, insertHitoFraude);
// fraudeRouter.post("/fraudes/hito/update", authRoutes, updateHitoFraude);
// fraudeRouter.post("/fraudes/hito/delete", authRoutes, deleteHitoFraude);
fraudeRouter.post("/fraudes/cambio", authRoutes, changePasswordFraude);
fraudeRouter.post("/fraudes/updatePerfil", authRoutes, updatePerfilFraude);

export default fraudeRouter;
