import express from "express";
import authRoutes from "../middleware/auth";
import {
  fraudesPage,
  addFraudesPage,
  editFraudesPage,
  verFraudesPage,
  ejercicioFraudesPage,
  hitosPage,
  addHitosPage,
  editHitosPage,
  insertHito,
  insertFraude,
  updateFraude,
  deleteFraude,
  asignarFraude,
  resolverFraude,
  remitirFraude,
  desadjudicarFraude,
  sms,
  ejercicio,
  updateHito,
  deleteHito,
  changePassword,
  updatePerfil,
} from "../controllers/fraude.controller";

const fraudeRouter = express.Router();

fraudeRouter.get("/fraudes", authRoutes, fraudesPage);
fraudeRouter.get("/fraudes/add", authRoutes, addFraudesPage);
fraudeRouter.get("/fraudes/edit/:id", authRoutes, editFraudesPage);
fraudeRouter.get("/fraudes/ver", authRoutes, verFraudesPage);
fraudeRouter.get(
  "/fraudes/ejercicio/:idfrau",
  authRoutes,
  ejercicioFraudesPage
);
fraudeRouter.get("/fraudes/hitos/:idfrau", authRoutes, hitosPage);
fraudeRouter.get("/fraudes/hitos/add/:idfrau", authRoutes, addHitosPage);
fraudeRouter.get("/fraudes/hitos/edit/:idfrau/:id", authRoutes, editHitosPage);

fraudeRouter.post("/fraudes/insert", authRoutes, insertFraude);
fraudeRouter.post("/fraudes/update", authRoutes, updateFraude);
fraudeRouter.post("/fraudes/delete", authRoutes, deleteFraude);
fraudeRouter.post("/fraudes/hitos/insert", authRoutes, insertHito);
fraudeRouter.post("/fraudes/hitos/update", authRoutes, updateHito);
fraudeRouter.post("/fraudes/hitos/delete", authRoutes, deleteHito);
fraudeRouter.post("/fraudes/asignar", authRoutes, asignarFraude);
fraudeRouter.post("/fraudes/resolver", authRoutes, resolverFraude);
fraudeRouter.post("/fraudes/remitir", authRoutes, remitirFraude);
fraudeRouter.post("/fraudes/desadjudicar", authRoutes, desadjudicarFraude);
fraudeRouter.post("/fraudes/sms", authRoutes, sms);
fraudeRouter.post("/fraudes/ejercicio", authRoutes, ejercicio);
fraudeRouter.post("/fraudes/cambio", authRoutes, changePassword);
fraudeRouter.post("/fraudes/updatePerfil", authRoutes, updatePerfil);

export default fraudeRouter;
