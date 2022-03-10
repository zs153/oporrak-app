import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insertOficina,
  updateOficina,
  deleteOficina,
} from "../controllers/oficina.controller";

const oficinaRouter = express.Router();

// paginas
oficinaRouter.get("/oficinas", verifyTokenAndAdmin, mainPage);
oficinaRouter.get("/oficinas/add", verifyTokenAndAdmin, addPage);
oficinaRouter.get("/oficinas/edit/:id", verifyTokenAndAdmin, editPage);

// procedures
oficinaRouter.post("/oficinas/insert", verifyTokenAndAdmin, insertOficina);
oficinaRouter.post("/oficinas/update", verifyTokenAndAdmin, updateOficina);
oficinaRouter.post("/oficinas/delete", verifyTokenAndAdmin, deleteOficina);

export default oficinaRouter;
