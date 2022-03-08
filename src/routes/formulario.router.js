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
      .withMessage("La longitud NIF mínimo 9 y máximo 11 caracteres")
      .custom((nif) => {
        const strBase = "TRWAGMYFPDXBNJZSQVHLCKET";
        const primeraPosicion = nif.slice(0, 1);
        let nuevoNif = nif;

        if (isNaN(primeraPosicion)) {
          nuevoNif = nif.slice(1);
          if (primeraPosicion === "Y") {
            nuevoNif = "1" + nuevoNif;
          } else if (primeraPosicion === "Z") {
            nuevoNif = "2" + nuevoNif;
          }
        }
        const dniLetra = nuevoNif.slice(8);
        const dniNumero = nuevoNif.slice(0, 8);
        const pos = parseInt(dniNumero) % 23;
        const letra = strBase.slice(pos, pos + 1);

        if (dniLetra === letra) {
          return true;
        }
      })
      .withMessage("Introduzca un NIF/NIE válido"),
    check("nomcon").not().isEmpty().withMessage("Debe introducir nombre"),
    check("movcon")
      .matches(/^([6]{1})([0-9]{8})|(7[1-4]{1})([0-9]{7})$/)
      .withMessage("Introduzca un número de movil válido"),
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
      .withMessage("La longitud NIF mínimo 9 y máximo 11 caracteres")
      .custom((nif) => {
        const strBase = "TRWAGMYFPDXBNJZSQVHLCKET";
        const primeraPosicion = nif.slice(0, 1);
        let nuevoNif = nif;

        if (isNaN(primeraPosicion)) {
          nuevoNif = nif.slice(1);
          if (primeraPosicion === "Y") {
            nuevoNif = "1" + nuevoNif;
          } else if (primeraPosicion === "Z") {
            nuevoNif = "2" + nuevoNif;
          }
        }
        const dniLetra = nuevoNif.slice(8);
        const dniNumero = nuevoNif.slice(0, 8);
        const pos = parseInt(dniNumero) % 23;
        const letra = strBase.slice(pos, pos + 1);
        console.log(letra);
        if (dniLetra === letra) {
          return true;
        }
      })
      .withMessage("Introduzca un NIF/NIE válido"),
    check("nomcon").not().isEmpty().withMessage("Debe introducir nombre"),
    check("movcon")
      .matches(/^([6]{1})([0-9]{8})|(7[1-4]{1})([0-9]{7})$/)
      .withMessage("Introduzca un número de movil válido"),
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
