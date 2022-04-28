import express from "express";
import authRoutes, { verifyTokenAndAdmin } from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  perfilPage,
  insert,
  update,
  remove,
  changePassword,
  updatePerfil,
  enviarNotificacion,
} from "../controllers/usuario.controller";

const usuarioRouter = express.Router();

// pages
usuarioRouter.get("/usuarios", verifyTokenAndAdmin, mainPage);
usuarioRouter.get("/usuarios/add", verifyTokenAndAdmin, addPage);
usuarioRouter.get("/usuarios/edit/:userid", verifyTokenAndAdmin, editPage);
usuarioRouter.get("/usuarios/perfil/:id", verifyTokenAndAdmin, perfilPage);

// procedures
usuarioRouter.post("/usuarios/insert", verifyTokenAndAdmin, insert);
usuarioRouter.post("/usuarios/update", verifyTokenAndAdmin, update);
usuarioRouter.post("/usuarios/delete", verifyTokenAndAdmin, remove);
usuarioRouter.post("/usuarios/notificacion", authRoutes, enviarNotificacion);
usuarioRouter.post("/usuarios/change", authRoutes, changePassword);
usuarioRouter.post("/usuarios/perfil", authRoutes, updatePerfil);

export default usuarioRouter;
