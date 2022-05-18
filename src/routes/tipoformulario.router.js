import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/tipoformulario.controller'

const tipoFormularioRouter = express.Router()

// paginas
tipoFormularioRouter.get('/tipos/formularios', authRoutes, mainPage)
tipoFormularioRouter.get('/tipos/formularios/add', authRoutes, addPage)
tipoFormularioRouter.get('/tipos/formularios/edit/:id', authRoutes, editPage)

// procedures
tipoFormularioRouter.post('/tipos/formularios/insert', authRoutes, insert)
tipoFormularioRouter.post('/tipos/formularios/update', authRoutes, update)
tipoFormularioRouter.post('/tipos/formularios/delete', authRoutes, remove)

export default tipoFormularioRouter
