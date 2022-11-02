import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
} from "../controllers/trapaso.controller";

const festivoRouter = express.Router();

// paginas
festivoRouter.get("/traspasos", authRoutes, mainPage);

export default festivoRouter;