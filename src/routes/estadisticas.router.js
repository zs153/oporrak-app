import express from "express";
import authRoutes from "../middleware/auth";
import { estadisticaFraude, fraudePage } from "../controllers/estadistica.controller";

const estadisticaRouter = express.Router();

// paginas
estadisticaRouter.get("/estadisticas/fraudes", authRoutes, fraudePage);
// proc
estadisticaRouter.post("/estadisticas/fraudes", authRoutes, estadisticaFraude);

export default estadisticaRouter;