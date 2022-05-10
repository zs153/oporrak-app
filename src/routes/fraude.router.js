import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
  asign,
  resol,
  remit,
  unasign,
  verTodo,
  sms,
  hitosPage,
  insertHito,
  addHitosPage,
} from "../controllers/fraude.controller";

const fraudeRouter = express.Router();

// paginas
fraudeRouter.get("/fraudes", authRoutes, mainPage);
fraudeRouter.get("/fraudes/add", authRoutes, addPage);
fraudeRouter.get("/fraudes/edit/:id", authRoutes, editPage);
fraudeRouter.get("/fraudes/sms", authRoutes, mainPage);
fraudeRouter.get("/fraudes/hitos/:id", authRoutes, hitosPage);
fraudeRouter.get("/fraudes/hitos/add/:id", authRoutes, addHitosPage);

// procedures
fraudeRouter.post("/fraudes/insert", authRoutes, insert);
fraudeRouter.post("/fraudes/update", authRoutes, update);
fraudeRouter.post("/fraudes/delete", authRoutes, remove);
fraudeRouter.post("/fraudes/asignar", authRoutes, asign);
fraudeRouter.post("/fraudes/resolver", authRoutes, resol);
fraudeRouter.post("/fraudes/remitir", authRoutes, remit);
fraudeRouter.post("/fraudes/desasignar", authRoutes, unasign);
fraudeRouter.get("/fraudes/vertodo", authRoutes, verTodo);
fraudeRouter.post("/fraudes/sms", authRoutes, sms);
// hitos
fraudeRouter.post("/fraudes/hitos/insert", authRoutes, insertHito);

export default fraudeRouter;
