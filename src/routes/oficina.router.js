import express from 'express'
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/oficina.controller'

const oficinaRouter = express.Router()

// paginas
oficinaRouter.get('/oficinas', authRoutes, mainPage)
oficinaRouter.get('/oficinas/add', authRoutes, addPage)
oficinaRouter.get('/oficinas/edit/:id', authRoutes, editPage)

// procedures
oficinaRouter.post('/oficinas/insert', authRoutes, insert)
oficinaRouter.post('/oficinas/update', authRoutes, update)
oficinaRouter.post('/oficinas/delete', authRoutes, remove)

export default oficinaRouter
