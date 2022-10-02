import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from "../controllers/matricula.controller";

const matriculaRouter = express.Router();

// paginas matriculas
matriculaRouter.get("/matriculas", authRoutes, mainPage);
matriculaRouter.get("/matriculas/add", authRoutes, addPage);
matriculaRouter.get("/matriculas/edit/:id", authRoutes, editPage);

// proc matriculas
matriculaRouter.post("/matriculas/insert", authRoutes, insert);
matriculaRouter.post("/matriculas/update", authRoutes, update);
matriculaRouter.post("/matriculas/delete", authRoutes, remove);

export default matriculaRouter;