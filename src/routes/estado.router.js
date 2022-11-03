import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import { mainPage, estadisticaPage } from "../controllers/estado.controller";

const estadoRouter = express.Router();

// paginas
estadoRouter.get("/estados", verifyTokenAndAdmin, mainPage);

// proc
estadoRouter.post("/estados/estadistica", verifyTokenAndAdmin, estadisticaPage);

export default estadoRouter;