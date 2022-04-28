import express from "express";
import {
  mainPage,
  estadisticaPage,
  estadistica,
  acumuladosPage,
  changePassword,
  updatePerfil,
  errorPage,
  perfilPage,
} from "../controllers/admin.controller";
import authRoutes, { verifyTokenAndAdmin } from "../middleware/auth";

const adminRouter = express.Router();

// paginas
adminRouter.get("/", authRoutes, mainPage);
adminRouter.get("/estadistica", verifyTokenAndAdmin, estadisticaPage);
adminRouter.get("/estadistica/acumulados", verifyTokenAndAdmin, acumuladosPage);
adminRouter.get("/perfil/:id", authRoutes, perfilPage);

// procedures
adminRouter.post("/cambio", authRoutes, changePassword);
adminRouter.post("/estadistica", verifyTokenAndAdmin, estadistica);
// error
adminRouter.post("/error400", errorPage);

export default adminRouter;
