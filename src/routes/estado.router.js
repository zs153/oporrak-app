import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import { mainPage, estadosPage } from "../controllers/estado.controller";

const estadoRouter = express.Router();

// paginas
estadoRouter.get("/estados", verifyTokenAndAdmin, mainPage);

// proc
estadoRouter.post("/estados/estados", verifyTokenAndAdmin, estadosPage);

export default estadoRouter;