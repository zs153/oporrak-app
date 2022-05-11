import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insertTipo,
  updateTipo,
  deleteTipo,
} from '../controllers/tipo.controller'

const tipoRouter = express.Router()

// paginas
tipoRouter.get('/tipos/:org?', authRoutes, mainPage)
tipoRouter.get('/tipos/add/:org', authRoutes, addPage)
tipoRouter.get('/tipos/edit/:id', authRoutes, editPage)

// procedures
tipoRouter.post('/tipos/insert', authRoutes, insertTipo)
tipoRouter.post('/tipos/update', authRoutes, updateTipo)
tipoRouter.post('/tipos/delete', authRoutes, deleteTipo)

export default tipoRouter
