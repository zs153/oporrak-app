import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPageFraude,
  addPageFraude,
  editPageFraude,
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
} from "../controllers/fraude.controller";

const fraudeRouter = express.Router();

// paginas
fraudeRouter.get("/fraudes", authRoutes, mainPageFraude);
fraudeRouter.get("/fraudes/add", authRoutes, addPageFraude);
fraudeRouter.get("/fraudes/edit/:id", authRoutes, editPageFraude);
fraudeRouter.get("/fraudes/sms", authRoutes, mainPageFraude);

// procedures
fraudeRouter.post(
  "/fraudes/insert",
  authRoutes,
  // [
  //   check("nifcon")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Debe introducir NIF")
  //     .isLength({ min: 9, max: 11 })
  //     .withMessage("La longitud NIF mínimo 9 y máximo 11 caracteres")
  //     .custom((nif) => {
  //       const strBase = "TRWAGMYFPDXBNJZSQVHLCKET";
  //       const primeraPosicion = nif.slice(0, 1);
  //       let nuevoNif = nif;

  //       if (isNaN(primeraPosicion)) {
  //         nuevoNif = nif.slice(1);
  //         if (primeraPosicion === "Y") {
  //           nuevoNif = "1" + nuevoNif;
  //         } else if (primeraPosicion === "Z") {
  //           nuevoNif = "2" + nuevoNif;
  //         }
  //       }
  //       const dniLetra = nuevoNif.slice(8);
  //       const dniNumero = nuevoNif.slice(0, 8);
  //       const pos = parseInt(dniNumero) % 23;
  //       const letra = strBase.slice(pos, pos + 1);

  //       if (dniLetra === letra) {
  //         return true;
  //       }
  //     })
  //     .withMessage("Introduzca un NIF/NIE válido"),
  //   check("nomcon").not().isEmpty().withMessage("Debe introducir nombre"),
  //   check("movcon")
  //     .matches(/^([6]{1})([0-9]{8})|(7[1-4]{1})([0-9]{7})$/)
  //     .withMessage("Introduzca un número de movil válido"),
  //   check("ejefra")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Debe introducir ejercicio")
  //     .isLength({ min: 4, max: 4 })
  //     .withMessage("La logintud del campo ejercicio es de 4 dígitos"),
  //   check("fecfra").isISO8601().toDate(),
  // ],
  // validateInsert,
  insertFraude
);
fraudeRouter.post(
  "/fraudes/update",
  authRoutes,
  // [
  //   check("nifcon")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Debe introducir NIF")
  //     .isLength({ min: 9, max: 11 })
  //     .withMessage("La longitud NIF mínimo 9 y máximo 11 caracteres")
  //     .custom((nif) => {
  //       const strBase = "TRWAGMYFPDXBNJZSQVHLCKET";
  //       const primeraPosicion = nif.slice(0, 1);
  //       let nuevoNif = nif;

  //       if (isNaN(primeraPosicion)) {
  //         nuevoNif = nif.slice(1);
  //         if (primeraPosicion === "Y") {
  //           nuevoNif = "1" + nuevoNif;
  //         } else if (primeraPosicion === "Z") {
  //           nuevoNif = "2" + nuevoNif;
  //         }
  //       }
  //       const dniLetra = nuevoNif.slice(8);
  //       const dniNumero = nuevoNif.slice(0, 8);
  //       const pos = parseInt(dniNumero) % 23;
  //       const letra = strBase.slice(pos, pos + 1);

  //       if (dniLetra === letra) {
  //         return true;
  //       }
  //     })
  //     .withMessage("Introduzca un NIF/NIE válido"),
  //   check("nomcon").not().isEmpty().withMessage("Debe introducir nombre"),
  //   check("movcon")
  //     .matches(/^([6]{1})([0-9]{8})|(7[1-4]{1})([0-9]{7})$/)
  //     .withMessage("Introduzca un número de movil válido"),
  //   check("ejedoc")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Debe introducir ejercicio")
  //     .isLength({ min: 4, max: 4 })
  //     .withMessage("La logintud del campo ejercicio es de 4 dígitos"),
  //   check("fecdoc").isISO8601().toDate(),
  // ],
  // validateUpdate,
  updateFraude
);
fraudeRouter.post("/fraudes/delete", authRoutes, deleteFraude);
fraudeRouter.post("/fraudes/asignar", authRoutes, asignarFraude);
fraudeRouter.post("/fraudes/resolver", authRoutes, resolverFraude);
fraudeRouter.post("/fraudes/remitir", authRoutes, remitirFraude);
fraudeRouter.post("/fraudes/desadjudicar", authRoutes, desadjudicarFraude);
fraudeRouter.get("/fraudes/vertodo", authRoutes, verTodoFraude);
fraudeRouter.post("/fraudes/sms", authRoutes, smsFraude);
fraudeRouter.post("/fraudes/cambio", authRoutes, changePasswordFraude);
fraudeRouter.post("/fraudes/updatePerfil", authRoutes, updatePerfilFraude);

export default fraudeRouter;
