import express from "express";
import {verifyTokenAndAdmin} from "../middleware/auth";
import { estadisticaFraude, fraudePage } from "../controllers/estadistica.controller";

const estadisticaRouter = express.Router();

// paginas
estadisticaRouter.get("/estadisticas/fraudes", verifyTokenAndAdmin, fraudePage);
// proc
estadisticaRouter.post("/estadisticas/fraudes", verifyTokenAndAdmin, estadisticaFraude);

export default estadisticaRouter;