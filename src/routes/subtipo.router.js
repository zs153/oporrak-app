import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  subtiposPage,
  addSubtipoPage,
  editSubtipoPage,
  insertSubtipo,
  updateSubtipo,
  deleteSubtipo,
} from "../controllers/subtipo.controller";

const subtipoRouter = express.Router();

// paginas
subtipoRouter.get("/subtipos", authRoutes, mainPage);
subtipoRouter.get("/subtipos/edit/:id", authRoutes, editPage);

// subtipos
subtipoRouter.get("/subtipos/tipo/:id", authRoutes, subtiposPage);
subtipoRouter.get("/subtipos/add/tipo/:id", authRoutes, addSubtipoPage);
subtipoRouter.get(
  "/subtipos/edit/tipo/:id/:idsub",
  authRoutes,
  editSubtipoPage
);

// procedures
subtipoRouter.post("/subtipos/insert", authRoutes, insertSubtipo);
subtipoRouter.post("/subtipos/update", authRoutes, updateSubtipo);
subtipoRouter.post("/subtipos/delete", authRoutes, deleteSubtipo);

export default subtipoRouter;
