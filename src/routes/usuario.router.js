import express from "express";
import authRoutes, { verifyTokenAndAdmin } from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  changePassword,
  updatePerfil,
  enviarNotificacion,
} from "../controllers/usuario.controller";

const usuarioRouter = express.Router();

// pages
usuarioRouter.get("/usuarios", verifyTokenAndAdmin, mainPage);
usuarioRouter.get("/usuarios/add", verifyTokenAndAdmin, addPage);
usuarioRouter.get("/usuarios/edit/:userid", verifyTokenAndAdmin, editPage);

// procedures
usuarioRouter.post("/usuarios/insert", verifyTokenAndAdmin, insertUsuario);
usuarioRouter.post("/usuarios/update", verifyTokenAndAdmin, updateUsuario);
usuarioRouter.post("/usuarios/delete", verifyTokenAndAdmin, deleteUsuario);
usuarioRouter.post("/usuarios/notificacion", authRoutes, enviarNotificacion);
usuarioRouter.post("/usuarios/change", authRoutes, changePassword);
usuarioRouter.post("/usuarios/updatePerfil", authRoutes, updatePerfil);

export default usuarioRouter;
