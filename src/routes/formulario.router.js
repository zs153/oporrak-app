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
import {
  validateInsert,
  validateUpdate,
} from "../middleware/formularioValidator";
import { check } from "express-validator";
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
  [
    check("nifcon")
      .not()
      .isEmpty()
      .withMessage("Debe introducir NIF")
      .isLength({ min: 9, max: 11 })
      .withMessage("La longitud NIF mínimo 9 y máximo 11 caracteres"),
    check("nomcon").not().isEmpty().withMessage("Debe introducir nombre"),
    check("telcon").not().isEmpty().withMessage("Debe introducir un teléfono"),
    check("ejedoc")
      .not()
      .isEmpty()
      .withMessage("Debe introducir ejercicio")
      .isLength({ min: 4, max: 4 })
      .withMessage("La logintud del campo ejercicio es de 4 dígitos"),
    check("fecdoc").isISO8601().toDate(),
  ],
  validateInsert,
  insertFormulario
);
formularioRouter.post(
  "/formularios/update",
  authRoutes,
  [
    check("nifcon")
      .not()
      .isEmpty()
      .withMessage("Debe introducir NIF")
      .isLength({ min: 9, max: 11 })
      .withMessage("La longitud NIF mínimo 9 y máximo 11 caracteres"),
    check("nomcon").not().isEmpty().withMessage("Debe introducir nombre"),
    check("telcon").not().isEmpty().withMessage("Debe introducir un teléfono"),
    check("ejedoc")
      .not()
      .isEmpty()
      .withMessage("Debe introducir ejercicio")
      .isLength({ min: 4, max: 4 })
      .withMessage("La logintud del campo ejercicio es de 4 dígitos"),
    check("fecdoc").isISO8601().toDate(),
  ],
  validateUpdate,
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
