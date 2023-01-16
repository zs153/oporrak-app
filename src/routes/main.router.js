import express from "express";
import { logout, mainPage } from "../controllers/main.controller";

const mainRouter = express.Router();

// acciones
mainRouter.get("/", mainPage);
mainRouter.get("/logout", logout)

export default mainRouter;
