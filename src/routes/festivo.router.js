import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
} from "../controllers/festivo.controller";

const festivoRouter = express.Router();

// paginas
festivoRouter.get("/festivos", authRoutes, mainPage);

export default festivoRouter;