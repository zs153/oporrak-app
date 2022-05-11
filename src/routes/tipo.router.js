import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insertTipo,
  updateTipo,
  deleteTipo,
} from "../controllers/tipo.controller";

const tipoRouter = express.Router();

// paginas
tipoRouter.get("/tipos/:org?", verifyTokenAndAdmin, mainPage);
tipoRouter.get("/tipos/add/:org", verifyTokenAndAdmin, addPage);
tipoRouter.get("/tipos/edit/:id", verifyTokenAndAdmin, editPage);

// procedures
tipoRouter.post("/tipos/insert", verifyTokenAndAdmin, insertTipo);
tipoRouter.post("/tipos/update", verifyTokenAndAdmin, updateTipo);
tipoRouter.post("/tipos/delete", verifyTokenAndAdmin, deleteTipo);

export default tipoRouter;
