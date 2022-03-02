import express from "express";
import authRoutes, { verifyTokenAndAdmin } from "../middleware/auth";
import { validationRules, validate } from "../middleware/smsValidator";
import {
  mainPage,
  addPage,
  editPage,
  insertSms,
  updateSms,
  deleteSms,
} from "../controllers/sms.controller";

const smsRouter = express.Router();

// paginas
smsRouter.get("/smss", authRoutes, mainPage);
smsRouter.get("/smss/add", authRoutes, addPage);
smsRouter.get("/smss/edit/:id", authRoutes, editPage);

// procedures
smsRouter.post(
  "/smss/insert",
  authRoutes,
  validationRules(),
  validate,
  insertSms
);
smsRouter.post(
  "/smss/update",
  authRoutes,
  validationRules(),
  validate,
  updateSms
);
smsRouter.post("/smss/delete", authRoutes, deleteSms);

export default smsRouter;
