import express from "express";
import authRoutes from "../middleware/auth";
import { citasPage, estadisticaCita, estadisticaFormulario, estadisticaFraude, formularioPage, fraudePage } from "../controllers/estadistica.controller";

const estadisticaRouter = express.Router();

// paginas
estadisticaRouter.get("/estadisticas/fraudes", authRoutes, fraudePage);
estadisticaRouter.get("/estadisticas/formularios", authRoutes, formularioPage);
estadisticaRouter.get("/estadisticas/citas", authRoutes, citasPage);
// proc
estadisticaRouter.post("/estadisticas/fraudes", authRoutes, estadisticaFraude);
estadisticaRouter.post("/estadisticas/formularios", authRoutes, estadisticaFormulario);
estadisticaRouter.post("/estadisticas/formularios", authRoutes, estadisticaCita);

export default estadisticaRouter;