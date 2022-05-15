import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/tipohito.controller'

const tipoRouter = express.Router()

// paginas
tipoRouter.get('/tipos/:org?', authRoutes, mainPage)
tipoRouter.get('/tipos/add/:org', authRoutes, addPage)
tipoRouter.get('/tipos/edit/:id', authRoutes, editPage)

// procedures
tipoRouter.post('/tipos/insert', authRoutes, insert)
tipoRouter.post('/tipos/update', authRoutes, update)
tipoRouter.post('/tipos/delete', authRoutes, remove)

export default tipoRouter
