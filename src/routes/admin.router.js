import express from 'express'
import { verifyTokenAndAdmin, verifyTokenAndResp } from "../middleware/auth";

import * as festivo from '../controllers/admin/festivo.controller'
import * as oficina from '../controllers/admin/oficina.controller'
import * as usuario from '../controllers/admin/usuario.controller'
import * as historico from '../controllers/admin/historico.controller'
import * as traspaso from '../controllers/admin/traspaso.controller'
import * as calendario from '../controllers/admin/calendario.controller'
import * as curso from '../controllers/admin/curso.controller'

const adminRouter = express.Router()

//--------------- paginas
// festivos
adminRouter.get('/festivos', verifyTokenAndAdmin, festivo.mainPage)
adminRouter.post('/festivos/calendario', verifyTokenAndAdmin, festivo.calendarioPage)

// oficinas
adminRouter.get('/oficinas', verifyTokenAndAdmin, oficina.mainPage)
adminRouter.get('/oficinas/add', verifyTokenAndAdmin, oficina.addPage)
adminRouter.get('/oficinas/edit/:id', verifyTokenAndAdmin, oficina.editPage)

// historico
adminRouter.get('/historicos', verifyTokenAndResp, historico.mainPage)

// usuarios
adminRouter.get('/usuarios', verifyTokenAndResp, usuario.mainPage)
adminRouter.get('/usuarios/add', verifyTokenAndResp, usuario.addPage)
adminRouter.get('/usuarios/edit/:id', verifyTokenAndResp, usuario.editPage)

// traspaso
adminRouter.get("/traspasos/:idofic", verifyTokenAndAdmin, traspaso.mainPage);
adminRouter.post("/traspasos/calendario", verifyTokenAndAdmin, traspaso.calendarioPage);

// cursos
adminRouter.get("/cursos", verifyTokenAndAdmin, curso.mainPage);
adminRouter.get("/cursos/add", verifyTokenAndAdmin, curso.addPage);
adminRouter.get("/cursos/edit/:id", verifyTokenAndAdmin, curso.editPage);

// calendario
adminRouter.get("/calendarios", verifyTokenAndAdmin, calendario.mainPage);
adminRouter.get("/calendarios/calendarios", verifyTokenAndAdmin, calendario.calendarioPage);

//--------------- procedures
// festivos
adminRouter.post('/festivos/update', verifyTokenAndAdmin, festivo.update)

// oficinas
adminRouter.post('/oficinas/insert', verifyTokenAndAdmin, oficina.insert)
adminRouter.post('/oficinas/update', verifyTokenAndAdmin, oficina.update)
adminRouter.post('/oficinas/delete', verifyTokenAndAdmin, oficina.remove)

// historico
adminRouter.post('/historicos/activar', verifyTokenAndResp, historico.activar)

// usuarios
adminRouter.post('/usuarios/insert', verifyTokenAndResp, usuario.insert)
adminRouter.post('/usuarios/update', verifyTokenAndResp, usuario.update)
adminRouter.post('/usuarios/delete', verifyTokenAndResp, usuario.remove)

// traspaso
adminRouter.post("/traspasos/update", verifyTokenAndAdmin, traspaso.update);

// cursos

// calendario
adminRouter.post("/calendarios/update", verifyTokenAndAdmin, calendario.update);

export default adminRouter
