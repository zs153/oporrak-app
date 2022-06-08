import express from 'express'
import {verifyTokenAndAdmin} from "../middleware/auth";
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
usuarioRouter.get('/usuarios', verifyTokenAndAdmin, mainPage)
usuarioRouter.get('/usuarios/add', verifyTokenAndAdmin, addPage)
usuarioRouter.get('/usuarios/edit/:id', verifyTokenAndAdmin, editPage)
usuarioRouter.get('/usuarios/perfil/:id', verifyTokenAndAdmin, perfilPage)

// procedures
usuarioRouter.post('/usuarios/insert', verifyTokenAndAdmin, insert)
usuarioRouter.post('/usuarios/update', verifyTokenAndAdmin, update)
usuarioRouter.post('/usuarios/delete', verifyTokenAndAdmin, remove)
usuarioRouter.post('/usuarios/notificacion', verifyTokenAndAdmin, enviarNotificacion)
usuarioRouter.post('/usuarios/change', verifyTokenAndAdmin, changePassword)
usuarioRouter.post('/usuarios/perfil', verifyTokenAndAdmin, updatePerfil)

export default usuarioRouter
