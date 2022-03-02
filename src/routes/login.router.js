import express from "express";
import {
  loginPage,
  verifyLogin,
  verifyLogout,
  forgotPage,
  forgotPassword,
  registroPage,
  crearRegistro,
} from "../controllers/login.controller";
import { validationRules, validate } from "../middleware/registroValidator";

const loginRouter = express.Router();

// auth
loginRouter.get("/login", loginPage);
loginRouter.post("/login", verifyLogin);
loginRouter.get("/logout", verifyLogout);
loginRouter.get("/forgot", forgotPage);
loginRouter.post("/forgot", forgotPassword);
loginRouter.get("/registro", registroPage);
loginRouter.post("/registro", validationRules(), validate, crearRegistro);

export default loginRouter;
