import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insertSubtipo,
  updateSubtipo,
  deleteSubtipo,
} from "../controllers/subtipo.controller";

const subtipoRouter = express.Router();

// paginas
subtipoRouter.get("/subtipos/:id?", verifyTokenAndAdmin, mainPage);
subtipoRouter.get("/subtipos/add/:id", verifyTokenAndAdmin, addPage);
subtipoRouter.get("/subtipos/edit/:id", verifyTokenAndAdmin, editPage);

// procedures
subtipoRouter.post("/subtipos/insert", verifyTokenAndAdmin, insertSubtipo);
subtipoRouter.post("/subtipos/update", verifyTokenAndAdmin, updateSubtipo);
subtipoRouter.post("/subtipos/delete", verifyTokenAndAdmin, deleteSubtipo);

export default subtipoRouter;
