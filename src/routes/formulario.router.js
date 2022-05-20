import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
  asign,
  resol,
  unasign,
  verTodo,
  sms,
} from "../controllers/formulario.controller";

const formularioRouter = express.Router();

// paginas
formularioRouter.get("/formularios", authRoutes, mainPage);
formularioRouter.get("/formularios/sms", authRoutes, mainPage);
formularioRouter.get("/formularios/add", authRoutes, addPage);
formularioRouter.get("/formularios/edit/:id", authRoutes, editPage);

// procedures
formularioRouter.post("/formularios/insert", authRoutes, insert);
formularioRouter.post("/formularios/update", authRoutes, update);
formularioRouter.post("/formularios/delete", authRoutes, remove);
formularioRouter.post("/formularios/asignar", authRoutes, asign);
formularioRouter.post("/formularios/resolver", authRoutes, resol);
formularioRouter.post("/formularios/desasignar", authRoutes, unasign);
formularioRouter.get("/formularios/vertodo", authRoutes, verTodo);
formularioRouter.post("/formularios/sms", authRoutes, sms);

export default formularioRouter;
