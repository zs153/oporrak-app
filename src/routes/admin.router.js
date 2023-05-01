import express from 'express'
import { verifyTokenAndAdmin, verifyTokenAndResp } from "../middleware/auth";

import * as festivo from '../controllers/admin/festivo.controller'
import * as oficina from '../controllers/admin/oficina.controller'
import * as usuario from '../controllers/admin/usuario.controller'
import * as historico from '../controllers/admin/historico.controller'
import * as traspaso from '../controllers/admin/traspaso.controller'
import * as calendario from '../controllers/admin/calendario.controller'

const adminRouter = express.Router()

//--------------- paginas
// festivos
adminRouter.get('/festivos', verifyTokenAndAdmin, festivo.mainPage)
adminRouter.get('/festivos/calendario/:id', verifyTokenAndAdmin, festivo.calendarioPage)

// oficinas
adminRouter.get('/oficinas', verifyTokenAndAdmin, oficina.mainPage)
adminRouter.get('/oficinas/add', verifyTokenAndAdmin, oficina.addPage)
adminRouter.get('/oficinas/edit/:id', verifyTokenAndAdmin, oficina.editPage)

// historico
adminRouter.get('/historicos', verifyTokenAndResp, historico.mainPage)
adminRouter.get('/historicos/edit/:id', verifyTokenAndResp, historico.editPage)

// usuarios
adminRouter.get('/usuarios', verifyTokenAndResp, usuario.mainPage)
adminRouter.get('/usuarios/add', verifyTokenAndResp, usuario.addPage)
adminRouter.get('/usuarios/edit/:id', verifyTokenAndResp, usuario.editPage)

// traspaso
adminRouter.get("/traspasos/:idofic", verifyTokenAndAdmin, traspaso.mainPage);
adminRouter.post("/traspasos/calendario", verifyTokenAndAdmin, traspaso.calendarioPage);

// cursos
// se sacan del admin router y se direccionan en curso router

// calendario
adminRouter.get("/calendarios", verifyTokenAndAdmin, calendario.mainPage);
adminRouter.get("/calendarios/calendario", verifyTokenAndAdmin, calendario.calendarioPage);

//--------------- procedures
// festivos
adminRouter.post('/festivos/update', verifyTokenAndAdmin, festivo.update)

// oficinas
adminRouter.post('/oficinas/insert', verifyTokenAndAdmin, oficina.insert)
adminRouter.post('/oficinas/update', verifyTokenAndAdmin, oficina.update)
adminRouter.post('/oficinas/delete', verifyTokenAndAdmin, oficina.remove)

// historico
adminRouter.post('/historicos/activar', verifyTokenAndResp, historico.activar)
adminRouter.post('/historicos/update', verifyTokenAndResp, historico.update)

// usuarios
adminRouter.post('/usuarios/insert', verifyTokenAndResp, usuario.insert)
adminRouter.post('/usuarios/update', verifyTokenAndResp, usuario.update)
adminRouter.post('/usuarios/delete', verifyTokenAndResp, usuario.remove)

// traspaso
adminRouter.post("/traspasos/update", verifyTokenAndAdmin, traspaso.update);

// calendario
adminRouter.post("/calendarios/update", verifyTokenAndAdmin, calendario.update);

export default adminRouter
