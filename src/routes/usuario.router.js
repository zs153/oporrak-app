import express from 'express'
import authRoutes, { verifyTokenAndAdmin } from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  changePassword,
  updatePerfil,
  enviarNotificacion,
} from '../controllers/usuario.controller'
import { validateInsert, validateUpdate } from '../middleware/usuarioValidator'
import { check } from 'express-validator'

const usuarioRouter = express.Router()

// pages
usuarioRouter.get('/usuarios', verifyTokenAndAdmin, mainPage)
usuarioRouter.get('/usuarios/add', verifyTokenAndAdmin, addPage)
usuarioRouter.get('/usuarios/edit/:userid', verifyTokenAndAdmin, editPage)

// procedures
usuarioRouter.post(
  '/usuarios/insert',
  verifyTokenAndAdmin,
  [
    check('userid')
      .not()
      .isEmpty()
      .withMessage('Debe introducir userID')
      .isLength({ min: 4, max: 20 })
      .withMessage('El userID debe tener mínimo 4 caracteres y máximo 20'),
    check('nomusu')
      .not()
      .isEmpty()
      .withMessage('Debe introducir un nombre de usuario'),
    check('emausu')
      .isEmail()
      .withMessage('Debe introducir un correo electrónico válido'),
    check('telusu')
      .not()
      .isEmpty()
      .withMessage('El teléfono debe tener mínimo 4 digitos'),
  ],
  validateInsert,
  insertUsuario
)
usuarioRouter.post(
  '/usuarios/update',
  verifyTokenAndAdmin,
  [
    check('userid')
      .not()
      .isEmpty()
      .withMessage('Debe introducir userID')
      .isLength({ min: 4, max: 20 })
      .withMessage('El userID debe tener mínimo 4 caracteres y máximo 20'),
    check('nomusu')
      .not()
      .isEmpty()
      .withMessage('Debe introducir un nombre de usuario'),
    check('emausu')
      .isEmail()
      .withMessage('Debe introducir un correo electrónico válido'),
    check('telusu')
      .not()
      .isEmpty()
      .withMessage('El teléfono debe tener mínimo 4 digitos'),
  ],
  validateUpdate,
  updateUsuario
)
usuarioRouter.post('/usuarios/delete', verifyTokenAndAdmin, deleteUsuario)
usuarioRouter.post('/usuarios/notificacion', authRoutes, enviarNotificacion)
usuarioRouter.post('/usuarios/change', authRoutes, changePassword)
usuarioRouter.post('/usuarios/updatePerfil', authRoutes, updatePerfil)

export default usuarioRouter
