import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  perfilPage,
  insert,
  update,
  remove,
  changePassword,
  updatePerfil,
  enviarNotificacion,
} from '../controllers/usuario.controller'

const usuarioRouter = express.Router()

// pages
usuarioRouter.get('/usuarios', authRoutes, mainPage)
usuarioRouter.get('/usuarios/add', authRoutes, addPage)
usuarioRouter.get('/usuarios/edit/:id', authRoutes, editPage)
usuarioRouter.get('/usuarios/perfil/:id', authRoutes, perfilPage)

// procedures
usuarioRouter.post('/usuarios/insert', authRoutes, insert)
usuarioRouter.post('/usuarios/update', authRoutes, update)
usuarioRouter.post('/usuarios/delete', authRoutes, remove)
usuarioRouter.post('/usuarios/notificacion', authRoutes, enviarNotificacion)
usuarioRouter.post('/usuarios/change', authRoutes, changePassword)
usuarioRouter.post('/usuarios/perfil', authRoutes, updatePerfil)

export default usuarioRouter
