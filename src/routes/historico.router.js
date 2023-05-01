import express from "express";
import {
  activar,
  historico,
  historicos,
  modificiar,
} from "../controllers/historico.controller";

const apiHistoricoRouter = express.Router();

// historicos
apiHistoricoRouter.post("/historico", historico);
apiHistoricoRouter.post("/historicos", historicos);
apiHistoricoRouter.post('/historicos/update', modificiar)
apiHistoricoRouter.post("/historicos/activar", activar);

export default apiHistoricoRouter;
