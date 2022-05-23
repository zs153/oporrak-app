import express from "express";
import authRoutes from "../middleware/auth";
import { fraudePage } from "../controllers/estadistica.controller";

const estadisticaRouter = express.Router();

// paginas
estadisticaRouter.get("/estadisticas/fraudes", authRoutes, fraudePage);

export default estadisticaRouter;