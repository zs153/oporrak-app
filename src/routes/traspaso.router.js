import express from "express";
import authRoutes from "../middleware/auth";
import {
  calendario,
  mainPage,
} from "../controllers/traspaso.controller";

const traspasoRouter = express.Router();

// pages
traspasoRouter.get("/traspasos", authRoutes, mainPage);

// proc 
traspasoRouter.post("/traspasos/calendario", authRoutes, calendario);

export default traspasoRouter;
