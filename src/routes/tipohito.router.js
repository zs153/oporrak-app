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

const tipoHitoRouter = express.Router()

// paginas
tipoHitoRouter.get('/tipos/hitos', authRoutes, mainPage)
tipoHitoRouter.get('/tipos/hitos/add', authRoutes, addPage)
tipoHitoRouter.get('/tipos/hitos/edit/:id', authRoutes, editPage)

// procedures
tipoHitoRouter.post('/tipos/hitos/insert', authRoutes, insert)
tipoHitoRouter.post('/tipos/hitos/update', authRoutes, update)
tipoHitoRouter.post('/tipos/hitos/delete', authRoutes, remove)

export default tipoHitoRouter