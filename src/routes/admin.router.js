import express from "express";
import {
  mainPage,
  estadisticaPage,
  estadistica,
  acumuladosPage,
  changePassword,
  updatePerfil,
} from "../controllers/admin.controller";
import authRoutes, { verifyTokenAndAdmin } from "../middleware/auth";

const adminRouter = express.Router();

// paginas
adminRouter.get("/", authRoutes, mainPage);
adminRouter.get("/estadistica", verifyTokenAndAdmin, estadisticaPage);
adminRouter.get("/estadistica/acumulados", verifyTokenAndAdmin, acumuladosPage);
// procedures
adminRouter.post("/update", authRoutes, updatePerfil);
adminRouter.post("/cambio", changePassword);
adminRouter.post("/estadistica", verifyTokenAndAdmin, estadistica);
adminRouter.post("/cambio", authRoutes, changePassword);
adminRouter.post("/updatePerfil", authRoutes, updatePerfil);

export default adminRouter;
