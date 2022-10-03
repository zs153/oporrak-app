import express from "express";
import {
  curso,
  cursos,
  crear,
  modificar,
  borrar,
} from "../controllers/curso.controller";

const apiMatriculaRouter = express.Router();

// matricula
apiMatriculaRouter.post("/curso", curso);
apiMatriculaRouter.post("/cursos", cursos);
apiMatriculaRouter.post("/cursos/insert", crear);
apiMatriculaRouter.post("/cursos/update", modificar);
apiMatriculaRouter.post("/cursos/delete", borrar);

export default apiMatriculaRouter;