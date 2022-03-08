import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import { validateInsert, validateUpdate } from "../middleware/smsValidator";
import {
  mainPage,
  addPage,
  editPage,
  insertSms,
  updateSms,
  deleteSms,
} from "../controllers/sms.controller";
import { check } from "express-validator";

const smsRouter = express.Router();

// paginas
smsRouter.get("/smss", verifyTokenAndAdmin, mainPage);
smsRouter.get("/smss/add", verifyTokenAndAdmin, addPage);
smsRouter.get("/smss/edit/:id", verifyTokenAndAdmin, editPage);

// procedures
smsRouter.post(
  "/smss/insert",
  verifyTokenAndAdmin,
  [
    check("refdoc")
      .not()
      .isEmpty()
      .withMessage("Debe introducir una referencia"),
    check("texsms")
      .not()
      .isEmpty()
      .withMessage("Debe introducir el texto sms")
      .isLength({ min: 1, max: 140 })
      .withMessage("La longitud del texto máximo 140 caracteres"),
  ],
  validateInsert,
  insertSms
);
smsRouter.post(
  "/smss/update",
  verifyTokenAndAdmin,
  [
    check("refdoc")
      .not()
      .isEmpty()
      .withMessage("Debe introducir una referencia"),
    check("texsms")
      .not()
      .isEmpty()
      .withMessage("Debe introducir el texto sms")
      .isLength({ min: 1, max: 140 })
      .withMessage("La longitud del texto máximo 140 caracteres"),
  ],
  validateUpdate,
  updateSms
);
smsRouter.post("/smss/delete", verifyTokenAndAdmin, deleteSms);

export default smsRouter;
