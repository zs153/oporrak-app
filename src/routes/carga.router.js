import express from 'express'
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/carga.controller'

const cargaRouter = express.Router()

// paginas
cargaRouter.get('/cargas', authRoutes, mainPage)
cargaRouter.get('/cargas/add', authRoutes, addPage)
cargaRouter.get('/cargas/edit/:id', authRoutes, editPage)

// procedures
cargaRouter.post('/cargas/insert', authRoutes, insert)
cargaRouter.post('/cargas/update', authRoutes, update)
cargaRouter.post('/cargas/delete', authRoutes, remove)

export default cargaRouter