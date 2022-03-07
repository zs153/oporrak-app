import express from 'express'
import { verifyTokenAndAdmin } from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insertTipo,
  updateTipo,
  deleteTipo,
} from '../controllers/tipo.controller'
import { validateInsert, validateUpdate } from '../middleware/tipoValidator'
import { check } from 'express-validator'

const tipoRouter = express.Router()

// paginas
tipoRouter.get('/tipos', verifyTokenAndAdmin, mainPage)
tipoRouter.get('/tipos/add', verifyTokenAndAdmin, addPage)
tipoRouter.get('/tipos/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
tipoRouter.post(
  '/tipos/insert',
  verifyTokenAndAdmin,
  [
    check('destip')
      .not()
      .isEmpty()
      .withMessage('De introducir descripción')
      .isLength({ max: 250 })
      .withMessage('La longitud de la descripción máximo 250'),
    check('ayutip')
      .not()
      .isEmpty()
      .withMessage('De introducir texto de ayuda')
      .isLength({ max: 250 })
      .withMessage('La longitud del texto máximo 4000'),
  ],
  validateInsert,
  insertTipo
)
tipoRouter.post(
  '/tipos/update',
  verifyTokenAndAdmin,
  [
    check('destip')
      .not()
      .isEmpty()
      .withMessage('De introducir descripción')
      .isLength({ max: 250 })
      .withMessage('La longitud de la descripción máximo 250'),
    check('ayutip')
      .not()
      .isEmpty()
      .withMessage('De introducir texto de ayuda')
      .isLength({ max: 250 })
      .withMessage('La longitud del texto máximo 4000'),
  ],
  validateUpdate,
  updateTipo
)
tipoRouter.post('/tipos/delete', verifyTokenAndAdmin, deleteTipo)

export default tipoRouter
