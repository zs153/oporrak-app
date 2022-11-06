import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
} from "../controllers/traspaso.controller";

const traspasoRouter = express.Router();

// paginas
traspasoRouter.get("/traspasos", authRoutes, mainPage);

export default traspasoRouter;
