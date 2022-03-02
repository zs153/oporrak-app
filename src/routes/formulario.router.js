import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insertFormulario,
  updateFormulario,
  deleteFormulario,
  asignarFormulario,
  changePassword,
  updatePerfil,
  resolverFormulario,
  remitirFormulario,
  desadjudicarFormulario,
  verTodo,
  sms,
} from "../controllers/formulario.controller";
import { validationRules, validate } from "../middleware/formularioValidator";
import {
  validationRulesSms,
  validateSms,
} from "../middleware/smsFormularioValidator";
const formularioRouter = express.Router();

// paginas
formularioRouter.get("/formularios", authRoutes, mainPage);
formularioRouter.get("/formularios/sms", authRoutes, mainPage);
formularioRouter.get("/formularios/add", authRoutes, addPage);
formularioRouter.get("/formularios/edit/:id", authRoutes, editPage);

// procedures
formularioRouter.post(
  "/formularios/insert",
  authRoutes,
  validationRules(),
  validate,
  insertFormulario
);
formularioRouter.post(
  "/formularios/update",
  authRoutes,
  validationRules(),
  validate,
  updateFormulario
);
formularioRouter.post("/formularios/delete", authRoutes, deleteFormulario);
formularioRouter.post("/formularios/asignar", authRoutes, asignarFormulario);
formularioRouter.post("/formularios/resolver", authRoutes, resolverFormulario);
formularioRouter.post("/formularios/remitir", authRoutes, remitirFormulario);
formularioRouter.post(
  "/formularios/desadjudicar",
  authRoutes,
  desadjudicarFormulario
);
formularioRouter.get("/formularios/vertodo", authRoutes, verTodo);
formularioRouter.post("/formularios/sms", authRoutes, sms);
formularioRouter.post("/formularios/cambio", authRoutes, changePassword);
formularioRouter.post("/formularios/updatePerfil", authRoutes, updatePerfil);

export default formularioRouter;
