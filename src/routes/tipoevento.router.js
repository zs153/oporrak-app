import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/tipoevento.controller'

const tipoEventoRouter = express.Router()

// paginas
tipoEventoRouter.get('/tipos/eventos', authRoutes, mainPage)
tipoEventoRouter.get('/tipos/eventos/add', authRoutes, addPage)
tipoEventoRouter.get('/tipos/eventos/edit/:id', authRoutes, editPage)

// procedures
tipoEventoRouter.post('/tipos/eventos/insert', authRoutes, insert)
tipoEventoRouter.post('/tipos/eventos/update', authRoutes, update)
tipoEventoRouter.post('/tipos/eventos/delete', authRoutes, remove)

export default tipoEventoRouter
