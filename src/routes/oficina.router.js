import express from 'express'
import { verifyTokenAndAdmin } from '../middleware/auth'
import {
  mainPage,
  addPage,
  editPage,
  insertOficina,
  updateOficina,
  deleteOficina,
} from '../controllers/oficina.controller'
import { check } from 'express-validator'
import { validateInsert, validateUpdate } from '../middleware/oficinaValidator'

const oficinaRouter = express.Router()

// paginas
oficinaRouter.get('/oficinas', verifyTokenAndAdmin, mainPage)
oficinaRouter.get('/oficinas/add', verifyTokenAndAdmin, addPage)
oficinaRouter.get('/oficinas/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
oficinaRouter.post(
  '/oficinas/insert',
  verifyTokenAndAdmin,
  [
    check('desofi')
      .not()
      .isEmpty()
      .withMessage('Debe introducir descripción')
      .isLength({ max: 250 })
      .withMessage('La longitud máxima de 250'),
    check('codofi')
      .not()
      .isEmpty()
      .withMessage('Debe introducir código')
      .isLength({ max: 20 })
      .withMessage('La longitud máxima de 250'),
  ],
  validateInsert,
  insertOficina
)
oficinaRouter.post(
  '/oficinas/update',
  verifyTokenAndAdmin,
  [
    check('desofi')
      .not()
      .isEmpty()
      .withMessage('Debe introducir descripción')
      .isLength({ max: 250 })
      .withMessage('La longitud máxima de 250'),
    check('codofi')
      .not()
      .isEmpty()
      .withMessage('Debe introducir código')
      .isLength({ max: 20 })
      .withMessage('La longitud máxima de 250'),
  ],
  validateUpdate,
  updateOficina
)
oficinaRouter.post('/oficinas/delete', verifyTokenAndAdmin, deleteOficina)

export default oficinaRouter
