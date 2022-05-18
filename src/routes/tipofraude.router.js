import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/tipofraude.controller'

const tipoFraudeRouter = express.Router()

// paginas
tipoFraudeRouter.get('/tipos/fraudes', authRoutes, mainPage)
tipoFraudeRouter.get('/tipos/fraudes/add', authRoutes, addPage)
tipoFraudeRouter.get('/tipos/fraudes/edit/:id', authRoutes, editPage)

// procedures
tipoFraudeRouter.post('/tipos/fraudes/insert', authRoutes, insert)
tipoFraudeRouter.post('/tipos/fraudes/update', authRoutes, update)
tipoFraudeRouter.post('/tipos/fraudes/delete', authRoutes, remove)

export default tipoFraudeRouter
